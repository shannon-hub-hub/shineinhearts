import 'dotenv/config';
import { query } from '../lib/db.js';
import bcrypt from 'bcryptjs';
import { NOTES_FROM_THE_HEART_BODY } from '../lib/blog-post-content';

async function seed() {
  console.log('Seeding database...');

  // Chapters
  const chaptersResult = await query(`
    INSERT INTO chapters (city, country, region, latitude, longitude) VALUES
    ('New York',      'United States', 'NY, United States',  40.7128, -74.0060),
    ('San Jose',      'United States', 'CA, United States',  37.3382, -121.8863),
    ('Washington',    'United States', 'D.C., United States',38.9072, -77.0369),
    ('Basking Ridge', 'United States', 'NJ, United States',  40.7057, -74.5496),
    ('Taipei',        'Taiwan',        'Taipei, Taiwan',      25.0330, 121.5654),
    ('Pingtung',      'Taiwan',        'Pingtung, Taiwan',    22.6760, 120.4880),
    ('Taoyuan',       'Taiwan',        'Taoyuan, Taiwan',     24.9937, 121.3010),
    ('Bogotá',        'Colombia',      'Bogotá, Colombia',     4.7110, -74.0721),
    ('Karnataka',     'India',         'Karnataka, India',    15.3173,  75.7139)
    ON CONFLICT DO NOTHING
    RETURNING id, city
  `);
  console.log(`Inserted ${chaptersResult.rows.length} chapters`);

  // Admin user
  const hash = await bcrypt.hash('admin123', 12);
  await query(`
    INSERT INTO members (name, role, email, is_admin, is_core_team, password_hash)
    VALUES ('Shannon Chiang', 'Founder', 'shineinhearts@gmail.com', true, true, $1)
    ON CONFLICT (email) DO UPDATE SET is_core_team = EXCLUDED.is_core_team
  `, [hash]);

  // Programs
  await query(`DELETE FROM programs`);
  await query(`
    INSERT INTO programs (name, category, description) VALUES
    ('Environmental Writers Collective', E'Writing &\nStorytelling',
     'Share your passion for nature and climate through writing. Contribute articles, stories, or reflections that inspire action, and see your work featured on our social media to amplify youth voices around the world.'),
    ('Music & Artworks Spotlight Series', E'Music &\nVisual Arts',
     'Turn creativity into impact. Submit music, artwork, or performances and be featured in our online spotlight series, where youth talent meets environmental advocacy and inspires a global audience.'),
    ('Student Ambassadors', E'Digital\nLeadership',
     'Lead the movement online. Create short videos, design engaging posts, and share research recaps and learning resources. Inspire peers, grow your digital skills, and help others learn and take action.'),
    ('Green Donation Drives', E'Community\nAction',
     'Make a tangible difference in your community. Help organize eco-friendly donation kits and sustainable goods, and share the impact online to inspire others to take action.')
  `);

  // Events (from the real events page)
  await query(`
    INSERT INTO events (title, description, event_date, location, is_virtual, partner_org, partner_url, attendee_count) VALUES
    ('Harmony of the Earth',
     'A heartfelt collaboration with Virtuosi Music & Art Foundation in honor of Mental Health Awareness Month and Mother''s Day. Over 100 elementary school students engaged through 4 interactive concerts.',
     '2025-05-10', 'San Jose, CA', false,
     'Virtuosi Music & Art Foundation', 'https://www.facebook.com/people/Virtuosi-Music-Art-Foundation/100094429847820/', 100),
    ('Sustainability on the Side',
     'First food donation initiative — donating sustainably packaged sandwiches and vegan donuts to The Bowery Mission.',
     '2025-04-16', 'New York, NY', false,
     'The Bowery Mission', 'https://www.bowery.org', 50),
    ('Music Education and Community Impact',
     'Collaborative session with Back to Bach focused on how music education can extend beyond performance into community building.',
     '2026-01-15', 'virtual', true,
     'Back to Bach', 'https://www.backtobachproject.org/', 30),
    ('Breaking into Product Management',
     'Virtual speaker session featuring a product manager sharing their journey from student life into tech and product roles.',
     '2026-01-16', 'virtual', true, NULL, NULL, 45),
    ('Audition Prep and Ensemble Teamwork',
     'Hands-on workshop with Back to Bach centered on audition preparation and collaborative ensemble skills.',
     '2026-04-12', 'virtual', true,
     'Back to Bach', 'https://www.backtobachproject.org/', 25)
    ON CONFLICT DO NOTHING
  `);

  // Blog post
  await query(`
    INSERT INTO blog_posts (title, slug, body, excerpt, author_name, image_url, tags, published, published_at)
    VALUES (
      'Notes from the Heart',
      'notes-from-the-heart',
      $1,
      'On a sunny afternoon in San Jose, over a hundred children wrote down what music meant to them. No prompting. No fancy words. Just the truth.',
      'Shannon C.',
      '/blog/notes-from-the-heart.jpeg',
      ARRAY['Community', 'Music', 'Mental Health'],
      true,
      '2025-05-18'
    ) ON CONFLICT (slug) DO UPDATE SET
      body = EXCLUDED.body,
      excerpt = EXCLUDED.excerpt,
      author_name = EXCLUDED.author_name,
      image_url = EXCLUDED.image_url,
      tags = EXCLUDED.tags,
      published_at = EXCLUDED.published_at
  `, [NOTES_FROM_THE_HEART_BODY]);

  // Impact metrics — time series for dashboard charts
  const metricsData = [
    ['people_served',    100, '2025-03-01'],
    ['people_served',    180, '2025-05-01'],
    ['people_served',    280, '2025-08-01'],
    ['people_served',    350, '2025-11-01'],
    ['people_served',    400, '2026-01-01'],
    ['people_served',    400, '2026-04-01'],
    ['volunteer_hours',   50, '2025-03-01'],
    ['volunteer_hours',  100, '2025-05-01'],
    ['volunteer_hours',  160, '2025-08-01'],
    ['volunteer_hours',  230, '2025-11-01'],
    ['volunteer_hours',  300, '2026-01-01'],
    ['volunteer_hours',  500, '2026-04-01'],
    ['cities_reached',     2, '2025-03-01'],
    ['cities_reached',     4, '2025-05-01'],
    ['cities_reached',     6, '2025-08-01'],
    ['cities_reached',     8, '2025-11-01'],
    ['cities_reached',    10, '2026-01-01'],
    ['cities_reached',    10, '2026-04-01'],
    ['events_hosted',      1, '2025-03-01'],
    ['events_hosted',      3, '2025-05-01'],
    ['events_hosted',      3, '2025-08-01'],
    ['events_hosted',      4, '2025-11-01'],
    ['events_hosted',      5, '2026-01-01'],
    ['events_hosted',      5, '2026-04-01'],
  ];

  for (const [name, value, date] of metricsData) {
    await query(
      `INSERT INTO impact_metrics (metric_name, value, recorded_at)
       VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
      [name, value, date]
    );
  }

  console.log('Seed complete.');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
