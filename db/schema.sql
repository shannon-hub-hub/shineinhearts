CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS chapters (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city        TEXT NOT NULL,
  country     TEXT NOT NULL,
  region      TEXT,
  latitude    DECIMAL(9,6),
  longitude   DECIMAL(9,6),
  founded_at  DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS members (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  role          TEXT NOT NULL,
  chapter_id    UUID REFERENCES chapters(id) ON DELETE SET NULL,
  photo_url     TEXT,
  bio           TEXT,
  email         TEXT UNIQUE,
  is_admin      BOOLEAN DEFAULT FALSE,
  is_core_team  BOOLEAN DEFAULT FALSE,
  is_advisor    BOOLEAN DEFAULT FALSE,
  password_hash TEXT,
  joined_at     DATE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title          TEXT NOT NULL,
  description    TEXT,
  event_date     DATE NOT NULL,
  location       TEXT NOT NULL,
  is_virtual     BOOLEAN DEFAULT FALSE,
  partner_org    TEXT,
  partner_url    TEXT,
  image_url      TEXT,
  attendee_count INT DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  body         TEXT NOT NULL,
  excerpt      TEXT,
  author_id    UUID REFERENCES members(id) ON DELETE SET NULL,
  author_name  TEXT NOT NULL,
  image_url    TEXT,
  tags         TEXT[] DEFAULT '{}',
  published    BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS programs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  category    TEXT NOT NULL,
  description TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS impact_metrics (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_name  TEXT NOT NULL,
  value        DECIMAL NOT NULL,
  recorded_at  DATE NOT NULL DEFAULT CURRENT_DATE,
  notes        TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS applications (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  interest     TEXT NOT NULL,
  message      TEXT,
  city         TEXT,
  status       TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  reviewed_by  UUID REFERENCES members(id) ON DELETE SET NULL,
  reviewed_at  TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT,
  message    TEXT NOT NULL,
  read       BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_published  ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_slug       ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_events_date     ON events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_members_chapter ON members(chapter_id);
CREATE INDEX IF NOT EXISTS idx_impact_name     ON impact_metrics(metric_name, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_apps_status     ON applications(status, created_at DESC);
