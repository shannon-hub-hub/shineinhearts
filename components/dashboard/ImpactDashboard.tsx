"use client";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

interface Props {
  data: {
    latest: Record<string, number> | null;
    timeSeries: {
      peopleServed: { value: number; recorded_at: string }[];
      volunteerHours: { value: number; recorded_at: string }[];
      citiesReached: { value: number; recorded_at: string }[];
      eventsHosted: { value: number; recorded_at: string }[];
    };
    partners: { title: string; location: string; attendee_count: number; event_date: string }[];
  };
}

const fmtDate = (d: string) => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dt = new Date(d);
  return `${months[dt.getMonth()]} '${String(dt.getFullYear()).slice(2)}`;
};

const PURPLE = "#8F7AAE";
const GREEN  = "#6F7D5C";

export function ImpactDashboard({ data }: Props) {
  const { latest, timeSeries } = data;

  const kpis = [
    { label: "People served",   value: latest?.people_served   ?? 0, suffix: "+" },
    { label: "Volunteer hours", value: latest?.volunteer_hours ?? 0, suffix: "+" },
    { label: "Cities reached",  value: latest?.cities_reached  ?? 0, suffix: "+" },
    { label: "Events hosted",   value: latest?.events_hosted   ?? 0, suffix: "" },
    { label: "Chapters",        value: latest?.chapters_count  ?? 0, suffix: "" },
    { label: "Members",         value: latest?.members_count   ?? 0, suffix: "+" },
  ];

  const merged = timeSeries.peopleServed.map((p, i) => ({
    date: fmtDate(p.recorded_at),
    "People served":   p.value,
    "Volunteer hours": timeSeries.volunteerHours[i]?.value ?? 0,
  }));

  const cityData = timeSeries.citiesReached.map(r => ({
    date: fmtDate(r.recorded_at), cities: r.value,
  }));

  return (
    <div>
      <section style={{ padding: "4rem 10%", borderBottom: "1px solid var(--color-border)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          border: "1px solid var(--color-border)" }} className="kpi-grid">
          {kpis.map((kpi, i) => (
            <div key={kpi.label} style={{
              padding: "3rem",
              borderRight: i % 3 !== 2 ? "1px solid var(--color-border)" : "none",
              borderBottom: i < 3 ? "1px solid var(--color-border)" : "none",
            }}>
              <span className="stat-num">{kpi.value}{kpi.suffix}</span>
              <span className="stat-label">{kpi.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "5rem 10%", borderBottom: "1px solid var(--color-border)" }}>
        <span className="label">Growth over time</span>
        <h2 style={{ marginBottom: "2.5rem" }}>Impact trajectory</h2>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={merged} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gPurple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={PURPLE} stopOpacity={0.2} />
                <stop offset="95%" stopColor={PURPLE} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={GREEN} stopOpacity={0.2} />
                <stop offset="95%" stopColor={GREEN} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "var(--color-text-muted)" }} />
            <YAxis tick={{ fontSize: 12, fill: "var(--color-text-muted)" }} />
            <Tooltip contentStyle={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", fontSize: 13 }} />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            <Area type="monotone" dataKey="People served"   stroke={PURPLE} fill="url(#gPurple)" strokeWidth={2} />
            <Area type="monotone" dataKey="Volunteer hours" stroke={GREEN}  fill="url(#gGreen)"  strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      <section style={{ padding: "5rem 10%", borderBottom: "1px solid var(--color-border)" }}>
        <span className="label">Geographic reach</span>
        <h2 style={{ marginBottom: "2.5rem" }}>Cities reached over time</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={cityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "var(--color-text-muted)" }} />
            <YAxis tick={{ fontSize: 12, fill: "var(--color-text-muted)" }} />
            <Tooltip contentStyle={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", fontSize: 13 }} />
            <Bar dataKey="cities" fill={PURPLE} name="Cities" radius={[2,2,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section style={{ padding: "5rem 10%" }}>
        <span className="label">Recent events</span>
        <h2 style={{ marginBottom: "2.5rem" }}>Events by attendance</h2>
        <div style={{ border: "1px solid var(--color-border)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 80px",
            padding: "12px 20px", borderBottom: "1px solid var(--color-border)",
            background: "var(--color-surface)" }}>
            {["Event", "Location", "Attendees"].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "var(--color-text-muted)" }}>{h}</span>
            ))}
          </div>
          {data.partners.map((e, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 180px 80px",
              padding: "14px 20px",
              borderBottom: i < data.partners.length - 1 ? "1px solid var(--color-border)" : "none" }}>
              <span style={{ fontSize: 14, color: "var(--color-text)", fontWeight: 500 }}>{e.title}</span>
              <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{e.location}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: PURPLE }}>{e.attendee_count}+</span>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media(max-width:700px){
          .kpi-grid{ grid-template-columns:1fr!important; }
          .kpi-grid>div{ border-right:none!important; border-bottom:1px solid var(--color-border)!important; }
        }
      `}</style>
    </div>
  );
}
