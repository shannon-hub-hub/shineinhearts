"use client";
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Users, Mail, FileText, Calendar, CheckSquare, Eye, Clock } from "lucide-react";
import { IMPACT_DISPLAY } from "@/lib/impact-display";

interface Props {
  data: {
    stats: Record<string, number> | null;
    recentApps: {
      id: string; name: string; email: string;
      interest: string; city: string | null;
      status: string; created_at: string;
    }[];
    recentMsgs: {
      id: string; name: string; email: string;
      subject: string | null; read: boolean; created_at: string;
    }[];
    impactTrend: { metric_name: string; value: number; recorded_at: string }[];
  };
}

const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" });
const fmtShort = (d: string) => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dt = new Date(d); return `${months[dt.getMonth()]} '${String(dt.getFullYear()).slice(2)}`;
};

export function AdminDashboardClient({ data }: Props) {
  const { stats, recentApps, recentMsgs, impactTrend } = data;
  const [appStates, setAppStates] = useState<Record<string, string>>({});

  async function reviewApp(id: string, status: "approved" | "rejected") {
    await fetch("/api/admin/applications", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setAppStates(prev => ({ ...prev, [id]: status }));
  }

  const kpis = [
    { label: "People served",    value: `${IMPACT_DISPLAY.peopleServed}+`, icon: Users,       color: "#8F7AAE" },
    { label: "Volunteer hours",  value: `${IMPACT_DISPLAY.volunteerHours}+`, icon: Clock,       color: "#6F7D5C" },
    { label: "Cities reached",   value: stats?.cities_reached  ?? 0, icon: Calendar,    color: "#C59BB0" },
    { label: "Pending apps",     value: stats?.pending_apps    ?? 0, icon: CheckSquare, color: "#B76A6A" },
    { label: "Unread messages",  value: stats?.unread_msgs     ?? 0, icon: Mail,        color: "#C79B5A" },
    { label: "Published posts",  value: stats?.published_posts ?? 0, icon: FileText,    color: "#675684" },
  ];

  // Reshape trend data
  const trendByDate: Record<string, Record<string, number>> = {};
  impactTrend.forEach(r => {
    const d = fmtShort(r.recorded_at);
    if (!trendByDate[d]) trendByDate[d] = {};
    trendByDate[d][r.metric_name] = r.value;
  });
  const trendData = Object.entries(trendByDate).map(([date, vals]) => ({ date, ...vals }));

  return (
    <div style={{ padding: "2rem 2.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontFamily: "var(--font-lora,serif)", color: "var(--color-text)" }}>
          Dashboard
        </h1>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 4 }}>
          Live data from PostgreSQL — {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "2rem" }}
        className="admin-kpi-grid">
        {kpis.map(({ label, value, icon: Icon, color }) => (
          <div key={label} style={{
            background: "white", border: "1px solid var(--color-border)",
            padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 4, background: `${color}18`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon size={16} style={{ color }} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: "var(--font-lora,serif)",
                color: "var(--color-text)", lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 3,
                textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts + tables row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: "1.5rem" }}
        className="admin-charts-grid">

        {/* Trend chart */}
        <div style={{ background: "white", border: "1px solid var(--color-border)", padding: "1.25rem" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--color-text-muted)", marginBottom: "1.25rem" }}>Impact trend</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--color-text-muted)" }} />
              <YAxis tick={{ fontSize: 11, fill: "var(--color-text-muted)" }} />
              <Tooltip contentStyle={{ fontSize: 12, border: "1px solid var(--color-border)", background: "var(--color-bg)" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="people_served"   stroke="#8F7AAE" strokeWidth={2} dot={false} name="People served" />
              <Line type="monotone" dataKey="volunteer_hours" stroke="#6F7D5C" strokeWidth={2} dot={false} name="Volunteer hours" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent messages */}
        <div style={{ background: "white", border: "1px solid var(--color-border)", padding: "1.25rem" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--color-text-muted)", marginBottom: "1rem" }}>Recent messages</div>
          {recentMsgs.map(msg => (
            <div key={msg.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--color-border)",
              display: "flex", alignItems: "flex-start", gap: 8 }}>
              {!msg.read && <div style={{ width: 6, height: 6, borderRadius: "50%",
                background: "#8F7AAE", marginTop: 5, flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text)",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {msg.name}
                </div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {msg.subject ?? msg.email}
                </div>
              </div>
              <span style={{ fontSize: 11, color: "var(--color-text-muted)", flexShrink: 0 }}>
                {fmtDate(msg.created_at)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Applications table */}
      <div style={{ background: "white", border: "1px solid var(--color-border)", padding: "1.25rem" }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--color-text-muted)", marginBottom: "1rem" }}>Pending applications</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              {["Name", "Email", "Interest", "City", "Date", "Actions"].map(h => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 11,
                  fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "var(--color-text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentApps.map(app => {
              const state = appStates[app.id] ?? app.status;
              return (
                <tr key={app.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 500, color: "var(--color-text)" }}>{app.name}</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-text-muted)" }}>{app.email}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ background: "var(--color-surface)", padding: "2px 8px",
                      fontSize: 11, fontWeight: 600, letterSpacing: "0.06em" }}>
                      {app.interest}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", color: "var(--color-text-muted)" }}>{app.city ?? "—"}</td>
                  <td style={{ padding: "10px 12px", color: "var(--color-text-muted)" }}>{fmtDate(app.created_at)}</td>
                  <td style={{ padding: "10px 12px" }}>
                    {state === "pending" ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => reviewApp(app.id, "approved")}
                          style={{ padding: "4px 10px", fontSize: 11, fontWeight: 600,
                            background: "#6F7D5C", color: "white", border: "none", cursor: "pointer" }}>
                          Approve
                        </button>
                        <button onClick={() => reviewApp(app.id, "rejected")}
                          style={{ padding: "4px 10px", fontSize: 11, fontWeight: 600,
                            background: "none", border: "1px solid var(--color-border)",
                            color: "var(--color-text-muted)", cursor: "pointer" }}>
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px",
                        background: state === "approved" ? "#6F7D5C18" : "#B76A6A18",
                        color: state === "approved" ? "#4F5B42" : "#B76A6A" }}>
                        {state.charAt(0).toUpperCase() + state.slice(1)}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style>{`
        @media(max-width:900px){
          .admin-kpi-grid{ grid-template-columns:repeat(2,1fr)!important; }
          .admin-charts-grid{ grid-template-columns:1fr!important; }
        }
      `}</style>
    </div>
  );
}
