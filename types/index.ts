export interface Chapter {
  id: string;
  city: string;
  country: string;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  founded_at: string | null;
  created_at: string;
  member_count?: number;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  chapter_id: string | null;
  photo_url: string | null;
  bio: string | null;
  email: string | null;
  is_admin: boolean;
  is_core_team: boolean;
  is_advisor: boolean;
  joined_at: string | null;
  created_at: string;
  chapter_city?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_date_str: string;
  location: string;
  is_virtual: boolean;
  partner_org: string | null;
  partner_url: string | null;
  image_url: string | null;
  attendee_count: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  excerpt: string | null;
  author_id: string | null;
  author_name: string;
  image_url: string | null;
  tags: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: string;
  name: string;
  category: string;
  description: string | null;
  is_active: boolean;
}

export interface ImpactMetric {
  id: string;
  metric_name: string;
  value: number;
  recorded_at: string;
  notes: string | null;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  interest: string;
  message: string | null;
  city: string | null;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

export interface DashboardStats {
  totalPeopleServed: number;
  totalVolunteerHours: number;
  citiesReached: number;
  eventsHosted: number;
  totalMembers: number;
  totalChapters: number;
  pendingApplications: number;
  unreadMessages: number;
  publishedPosts: number;
}

export interface MetricTimeSeries {
  recorded_at: string;
  value: number;
}

export interface ImpactTimeSeries {
  month: string;
  people_served: number;
  volunteer_hours: number;
}

export interface ImpactSummary {
  people_served: number;
  volunteer_hours: number;
  members_count: number;
  events_count: number;
  cities_reached: number;
  countries_count: number;
}
