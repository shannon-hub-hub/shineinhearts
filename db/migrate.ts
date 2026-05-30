import 'dotenv/config';
import { query } from '../lib/db.js';

async function migrate() {
  console.log('Running migrations...');

  await query(`
    ALTER TABLE members
      ADD COLUMN IF NOT EXISTS is_core_team BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS is_advisor BOOLEAN DEFAULT FALSE
  `);

  await query(`
    UPDATE members
    SET is_core_team = TRUE
    WHERE email = 'shineinhearts@gmail.com' AND is_core_team IS NOT TRUE
  `);

  await query(`
    INSERT INTO impact_metrics (metric_name, value, recorded_at)
    VALUES
      ('people_served', 400, CURRENT_DATE),
      ('volunteer_hours', 500, CURRENT_DATE)
  `);

  await query(`
    UPDATE programs SET
      category = E'Writing &\nStorytelling',
      description = 'Share your passion for nature and climate through writing. Contribute articles, stories, or reflections that inspire action, and see your work featured on our social media to amplify youth voices around the world.'
    WHERE name = 'Environmental Writers Collective'
  `);
  await query(`
    UPDATE programs SET
      category = E'Music &\nVisual Arts',
      description = 'Turn creativity into impact. Submit music, artwork, or performances and be featured in our online spotlight series, where youth talent meets environmental advocacy and inspires a global audience.'
    WHERE name = 'Music & Artworks Spotlight Series'
  `);
  await query(`
    UPDATE programs SET
      category = E'Digital\nLeadership',
      description = 'Lead the movement online. Create short videos, design engaging posts, and share research recaps and learning resources. Inspire peers, grow your digital skills, and help others learn and take action.'
    WHERE name = 'Student Ambassadors'
  `);
  await query(`
    UPDATE programs SET
      category = E'Community\nAction',
      description = 'Make a tangible difference in your community. Help organize eco-friendly donation kits and sustainable goods, and share the impact online to inspire others to take action.'
    WHERE name = 'Green Donation Drives'
  `);

  console.log('Migrations complete.');
  process.exit(0);
}

migrate().catch((e) => {
  console.error(e);
  process.exit(1);
});
