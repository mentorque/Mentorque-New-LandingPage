import { useEffect, useRef, useState } from "react";

type NodeKey = keyof typeof NODES;
type NodeDef = {
  x: number; y: number; w: number; h: number;
  type: string; label: string; sub?: string;
};

const NODES = {
  trigger:   { x: 8,   y: 22,  w: 88,  h: 68,  type: "trigger",   label: "New job match" },
  agent:     { x: 112, y: 10,  w: 128, h: 90,  type: "agent",     label: "AI Job Agent", sub: "Tools Agent" },
  condition: { x: 258, y: 28,  w: 80,  h: 60,  type: "condition", label: "Easy Apply?" },
  apply:     { x: 30,  y: 168, w: 100, h: 88,  type: "action",    label: "Auto Apply",   sub: "submit: application" },
  notify:    { x: 220, y: 168, w: 100, h: 88,  type: "action",    label: "Notify Me",    sub: "send: alert" },
  linkedin:  { x: 8,   y: 300, w: 68,  h: 68,  type: "tool",      label: "LinkedIn" },
  indeed:    { x: 88,  y: 300, w: 68,  h: 68,  type: "tool",      label: "Indeed" },
  workday:   { x: 168, y: 300, w: 68,  h: 68,  type: "tool",      label: "Workday" },
  anthropic: { x: 248, y: 300, w: 68,  h: 68,  type: "tool",      label: "Anthropic" },
} satisfies Record<string, NodeDef>;

// Helper: center of a node
const cx = (k: NodeKey) => NODES[k].x + NODES[k].w / 2;
// Right edge center
const rx = (k: NodeKey) => NODES[k].x + NODES[k].w;
const ry = (k: NodeKey) => NODES[k].y + NODES[k].h / 2;
// Left edge center
const lx = (k: NodeKey) => NODES[k].x;
const ly = (k: NodeKey) => NODES[k].y + NODES[k].h / 2;
// Bottom edge center
const bx = (k: NodeKey) => NODES[k].x + NODES[k].w / 2;
const by = (k: NodeKey) => NODES[k].y + NODES[k].h;
// Top edge center
const ty = (k: NodeKey) => NODES[k].y;

const SEQ: NodeKey[] = [
  "trigger","agent","condition","apply","notify",
  "linkedin","indeed","workday","anthropic",
];

// Edge definitions: [from, to, path-fn, id]
// Each path is hand-calculated to avoid overlaps
type EdgeDef = { id: string; from: NodeKey; to: NodeKey; d: string };

const EDGES: EdgeDef[] = [
  // trigger → agent (right-to-left, horizontal)
  {
    id: "trigger-agent",
    from: "trigger", to: "agent",
    d: `M ${rx("trigger")} ${ry("trigger")} L ${lx("agent")} ${ly("agent")}`,
  },
  // agent → condition (right-to-left, horizontal)
  {
    id: "agent-condition",
    from: "agent", to: "condition",
    d: `M ${rx("agent")} ${ry("agent")} L ${lx("condition")} ${ly("condition")}`,
  },
  // condition → apply (bottom of condition, curves down-left to top of apply)
  {
    id: "condition-apply",
    from: "condition", to: "apply",
    d: `M ${cx("condition")} ${by("condition")} 
        C ${cx("condition")} ${by("condition") + 40}, 
          ${bx("apply")} ${ty("apply") - 40}, 
          ${bx("apply")} ${ty("apply")}`,
  },
  // condition → notify (bottom of condition, curves down to top of notify)
  {
    id: "condition-notify",
    from: "condition", to: "notify",
    d: `M ${cx("condition")} ${by("condition")} 
        C ${cx("condition")} ${by("condition") + 30}, 
          ${bx("notify")} ${ty("notify") - 30}, 
          ${bx("notify")} ${ty("notify")}`,
  },
  // apply → linkedin (bottom of apply, straight down-left)
  {
    id: "apply-linkedin",
    from: "apply", to: "linkedin",
    d: `M ${cx("apply")} ${by("apply")} 
        C ${cx("apply")} ${by("apply") + 20}, 
          ${cx("linkedin")} ${ty("linkedin") - 20}, 
          ${cx("linkedin")} ${ty("linkedin")}`,
  },
  // apply → indeed (bottom of apply, down)
  {
    id: "apply-indeed",
    from: "apply", to: "indeed",
    d: `M ${cx("apply")} ${by("apply")} 
        C ${cx("apply")} ${by("apply") + 20}, 
          ${cx("indeed")} ${ty("indeed") - 20}, 
          ${cx("indeed")} ${ty("indeed")}`,
  },
  // notify → workday
  {
    id: "notify-workday",
    from: "notify", to: "workday",
    d: `M ${cx("notify")} ${by("notify")} 
        C ${cx("notify")} ${by("notify") + 20}, 
          ${cx("workday")} ${ty("workday") - 20}, 
          ${cx("workday")} ${ty("workday")}`,
  },
  // notify → anthropic
  {
    id: "notify-anthropic",
    from: "notify", to: "anthropic",
    d: `M ${cx("notify")} ${by("notify")} 
        C ${cx("notify")} ${by("notify") + 20}, 
          ${cx("anthropic")} ${ty("anthropic") - 20}, 
          ${cx("anthropic")} ${ty("anthropic")}`,
  },
];

// Which edges light up when a node is active
const EDGE_MAP: Record<NodeKey, string[]> = {
  trigger:   ["trigger-agent"],
  agent:     ["trigger-agent", "agent-condition"],
  condition: ["agent-condition", "condition-apply", "condition-notify"],
  apply:     ["condition-apply", "apply-linkedin", "apply-indeed"],
  notify:    ["condition-notify", "notify-workday", "notify-anthropic"],
  linkedin:  ["apply-linkedin"],
  indeed:    ["apply-indeed"],
  workday:   ["notify-workday"],
  anthropic: ["notify-anthropic"],
};

// ── Icons ──────────────────────────────────────────────────────────────────
function TriggerIcon({ active = false }) {
  const c = active ? "rgba(255,200,50,0.9)" : "rgba(255,255,255,0.55)";
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={c} strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BriefcaseIcon({ active = false }) {
  const c = active ? "rgba(99,170,255,0.9)" : "rgba(255,255,255,0.55)";
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="9" width="18" height="12" rx="2" stroke={c} strokeWidth="1.5" />
      <path d="M8 9V7a4 4 0 018 0v2" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 14h18" stroke={c} strokeWidth="1.5" />
    </svg>
  );
}
function BellIcon({ active = false }) {
  const c = active ? "rgba(99,170,255,0.9)" : "rgba(255,255,255,0.55)";
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
        stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function WorkdayLogo({ active = false }) {
  const c = active ? "#60a5fa" : "rgba(255,255,255,0.65)";
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4"
        fill={active ? "rgba(96,165,250,0.18)" : "rgba(255,255,255,0.07)"} />
      <path d="M5 8l3 8 2.5-5.5L13 16l3-8" stroke={c} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="8" r="1.5" fill={c} />
    </svg>
  );
}
function AnthropicLogo({ active = false }) {
  const c = active ? "#60a5fa" : "rgba(255,255,255,0.65)";
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4"
        fill={active ? "rgba(96,165,250,0.18)" : "rgba(255,255,255,0.07)"} />
      <path d="M12 5L16.5 17H14.2L13.1 14H10.9L9.8 17H7.5L12 5Z" fill={c} />
      <path d="M11.3 12.2L12 10.1L12.7 12.2H11.3Z"
        fill={active ? "rgba(14,14,18,0.8)" : "rgba(26,28,34,0.9)"} />
    </svg>
  );
}

const SVG_W = 348;
const SVG_H = 390;

export default function MockupCard5AutomationMobile() {
  const [lit, setLit]     = useState<NodeKey[]>([]);
  const [pulse, setPulse] = useState<NodeKey | null>(null);
  const [litEdges, setLitEdges] = useState<Set<string>>(new Set());
  const idx = useRef(0);

  useEffect(() => {
    const iv = setInterval(() => {
      const key = SEQ[idx.current % SEQ.length];
      setLit(prev => [...prev.slice(-3), key]);
      setPulse(key);
      // Light up connected edges
      setLitEdges(new Set(EDGE_MAP[key] ?? []));
      setTimeout(() => setPulse(null), 380);
      idx.current++;
    }, 700);
    return () => clearInterval(iv);
  }, []);

  const isLit = (k: NodeKey) => lit.includes(k);
  const isPulse = (k: NodeKey) => pulse === k;

  const nodeStyle = (k: NodeKey): React.CSSProperties => {
    const n = NODES[k];
    const active = isLit(k);
    const isAgent = n.type === "agent";
    return {
      position: "absolute",
      left: n.x, top: n.y, width: n.w, height: n.h,
      borderRadius: n.type === "tool" ? "50%" : 10,
      background: active
        ? isAgent ? "rgba(59,130,246,0.22)" : "rgba(255,255,255,0.09)"
        : isAgent ? "rgba(38,42,52,0.97)"   : "rgba(24,26,32,0.96)",
      border: active
        ? `1px solid ${isAgent ? "rgba(59,130,246,0.55)" : "rgba(255,255,255,0.28)"}`
        : "0.5px solid rgba(255,255,255,0.09)",
      boxShadow: isPulse(k)
        ? isAgent
          ? "0 0 18px rgba(59,130,246,0.4)"
          : "0 0 12px rgba(255,255,255,0.14)"
        : "none",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 2,
      transition: "background 0.28s, border 0.28s, box-shadow 0.28s",
      zIndex: 2, overflow: "hidden",
    };
  };

  return (
    <div
      style={{
        background: "rgba(14,14,18,0.97)",
        width: "100%",
        maxWidth: 390,
        margin: "0 auto",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        borderRadius: 18,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative", width: SVG_W, height: SVG_H }}>

        {/* SVG layer: dot grid + edges */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern id="mg5" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="9" cy="9" r="0.8" fill="rgba(255,255,255,0.09)" />
            </pattern>

            {/* Animated dash marker for active edges */}
            {EDGES.map(e => (
              <marker
                key={`mk-${e.id}`}
                id={`dot-${e.id}`}
                viewBox="0 0 4 4"
                refX="2" refY="2"
                markerWidth="3" markerHeight="3"
              >
                <circle cx="2" cy="2" r="1.5"
                  fill={litEdges.has(e.id) ? "rgba(99,170,255,0.9)" : "rgba(255,255,255,0.2)"} />
              </marker>
            ))}
          </defs>

          {/* Dot grid */}
          <rect x="0" y="0" width={SVG_W} height={SVG_H} fill="url(#mg5)" />

          {/* Edges — render dim base lines first, then lit overlay */}
          {EDGES.map(e => {
            const active = litEdges.has(e.id);
            return (
              <g key={e.id}>
                {/* Base dim line — always visible */}
                <path
                  d={e.d}
                  fill="none"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                {/* Active lit line with animated dash */}
                <path
                  d={e.d}
                  fill="none"
                  stroke={active ? "rgba(99,170,255,0.45)" : "transparent"}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="3 5"
                  strokeDashoffset="0"
                  style={{
                    transition: "stroke 0.3s",
                    animation: active ? "dashMove 0.8s linear infinite" : "none",
                  }}
                />
                {/* Terminal dot at destination */}
                {active && (() => {
                  const dest = NODES[e.to];
                  const isCircle = dest.type === "tool";
                  // Top center of destination node
                  const dotX = dest.x + dest.w / 2;
                  const dotY = isCircle ? dest.y : dest.y;
                  return (
                    <circle
                      cx={dotX}
                      cy={dotY}
                      r="2"
                      fill="rgba(99,170,255,0.7)"
                      style={{ transition: "opacity 0.3s" }}
                    />
                  );
                })()}
              </g>
            );
          })}

          <style>{`
            @keyframes dashMove {
              to { stroke-dashoffset: -16; }
            }
          `}</style>
        </svg>

        {/* HTML node overlays */}
        {(Object.entries(NODES) as [NodeKey, NodeDef][]).map(([k, n]) => (
          <div key={k} style={nodeStyle(k)}>

            {n.type === "trigger" && <>
              <div style={{
                width: 26, height: 26, borderRadius: 7,
                background: isLit(k) ? "rgba(255,200,50,0.16)" : "rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.28s",
              }}>
                <TriggerIcon active={isLit(k)} />
              </div>
              <div style={{
                fontSize: 8, color: "rgba(255,255,255,0.42)",
                textAlign: "center", lineHeight: 1.35, marginTop: 4, padding: "0 5px",
              }}>{n.label}</div>
            </>}

            {n.type === "agent" && <>
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "0 8px" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                  background: isLit(k) ? "rgba(59,130,246,0.28)" : "rgba(59,130,246,0.10)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
                  transition: "background 0.28s",
                }}>🤖</div>
                <div>
                  <div style={{ fontSize: 10.5, color: "#fff", fontWeight: 500, lineHeight: 1.2 }}>{n.label}</div>
                  <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{n.sub}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                {["Search","Apply","Tailor"].map(lbl => (
                  <div key={lbl} style={{
                    fontSize: 7.5, color: "rgba(255,255,255,0.26)",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                  }}>
                    <div style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: isLit(k) ? "rgba(99,170,255,0.7)" : "rgba(255,255,255,0.18)",
                      transition: "background 0.28s",
                    }} />
                    {lbl}
                  </div>
                ))}
              </div>
            </>}

            {n.type === "condition" && <>
              <div style={{
                fontSize: 18, color: isLit(k) ? "#60a5fa" : "rgba(255,255,255,0.45)",
                transition: "color 0.28s", lineHeight: 1,
              }}>⇌</div>
              <div style={{
                fontSize: 8, color: "rgba(255,255,255,0.38)",
                textAlign: "center", marginTop: 3, lineHeight: 1.3, padding: "0 4px",
              }}>{n.label}</div>
            </>}

            {n.type === "action" && <>
              <div style={{
                width: 26, height: 26, borderRadius: 7,
                background: isLit(k) ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.05)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.28s",
              }}>
                {k === "apply" ? <BriefcaseIcon active={isLit(k)} /> : <BellIcon active={isLit(k)} />}
              </div>
              <div style={{
                fontSize: 9, color: isLit(k) ? "#fff" : "rgba(255,255,255,0.68)",
                fontWeight: 500, marginTop: 4, textAlign: "center",
                lineHeight: 1.3, padding: "0 6px", transition: "color 0.28s",
              }}>{n.label}</div>
              <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.25)", textAlign: "center", padding: "0 4px" }}>{n.sub}</div>
            </>}

            {n.type === "tool" && <>
              {k === "linkedin" && (
                <div style={{
                  width: 22, height: 22, borderRadius: 4,
                  background: isLit(k) ? "rgba(96,165,250,0.18)" : "rgba(255,255,255,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.28s",
                }}>
                  <img
                    src="/Landscape-Component/linkedin-svgrepo-com.svg"
                    alt="LinkedIn"
                    style={{ width: 16, height: 16, objectFit: "contain", opacity: isLit(k) ? 1 : 0.7 }}
                  />
                </div>
              )}
              {k === "indeed" && (
                <div style={{
                  width: 22, height: 22, borderRadius: 4,
                  background: isLit(k) ? "rgba(96,165,250,0.18)" : "rgba(255,255,255,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.28s",
                }}>
                  <img
                    src="/Landscape-Component/indeed-svgrepo-com.svg"
                    alt="Indeed"
                    style={{ width: 16, height: 16, objectFit: "contain", opacity: isLit(k) ? 1 : 0.7 }}
                  />
                </div>
              )}
              {k === "workday"   && <WorkdayLogo   active={isLit(k)} />}
              {k === "anthropic" && <AnthropicLogo active={isLit(k)} />}
              <div style={{
                fontSize: 7.5,
                color: isLit(k) ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.35)",
                textAlign: "center", marginTop: 4, lineHeight: 1.3, padding: "0 3px",
                transition: "color 0.28s",
              }}>{n.label}</div>
            </>}

          </div>
        ))}
      </div>
    </div>
  );
}