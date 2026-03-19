import { useEffect, useRef, useState } from "react";

type NodeKey = keyof typeof NODES;
type NodeDef = { x: number; y: number; w: number; h: number; type: string; label: string; sub?: string };

const NODES = {
  trigger:  { x: 30,  y: 175, w: 115, h: 80,  type: "trigger",   label: "New job match found" },
  agent:    { x: 200, y: 148, w: 165, h: 100,  type: "agent",     label: "AI Job Agent", sub: "Tools Agent" },
  condition:{ x: 425, y: 162, w: 95,  h: 70,   type: "condition", label: "Easy Apply?" },
  apply:    { x: 588, y: 60,  w: 122, h: 107,  type: "action",    label: "Auto Apply", sub: "submit: application" },
  notify:   { x: 588, y: 230, w: 122, h: 107,  type: "action",    label: "Notify Me", sub: "send: alert" },
  linkedin: { x: 175, y: 352, w: 78,  h: 78,   type: "tool",      label: "LinkedIn",  },
  indeed:   { x: 275, y: 352, w: 78,  h: 78,   type: "tool",      label: "Indeed",  },
  workday:  { x: 375, y: 352, w: 78,  h: 78,   type: "tool",      label: "Workday", },
  anthropic:{ x: 475, y: 352, w: 78,  h: 78,   type: "tool",      label: "Anthropic", },
} satisfies Record<string, NodeDef>;

const cx = (n: NodeDef) => n.x + n.w / 2;
const cy = (n: NodeDef) => n.y + n.h / 2;
const SEQ: NodeKey[] = ["trigger","agent","condition","apply","notify","linkedin","indeed","workday","anthropic"];

const LANDSCAPE_LOGOS = {
  linkedin: "/Landscape-Component/linkedin-svgrepo-com.svg",
  indeed: "/Landscape-Component/indeed-svgrepo-com.svg",
} as const;

/* ── Logo components: use SVGs from Landscape-Component where available ── */
function LinkedInLogo({ size = 20, active = false }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 4,
      background: active ? "rgba(96,165,250,0.2)" : "rgba(255,255,255,0.08)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 2, transition: "background 0.28s",
    }}>
      <img src={LANDSCAPE_LOGOS.linkedin} alt="LinkedIn" style={{ width: "100%", height: "100%", objectFit: "contain", opacity: active ? 1 : 0.75 }} />
    </div>
  );
}

function IndeedLogo({ size = 20, active = false }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 4,
      background: active ? "rgba(96,165,250,0.2)" : "rgba(255,255,255,0.08)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 2, transition: "background 0.28s",
    }}>
      <img src={LANDSCAPE_LOGOS.indeed} alt="Indeed" style={{ width: "100%", height: "100%", objectFit: "contain", opacity: active ? 1 : 0.75 }} />
    </div>
  );
}

function WorkdayLogo({ size = 20, active = false }) {
  const c = active ? "#60a5fa" : "rgba(255,255,255,0.7)";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill={active ? "rgba(96,165,250,0.2)" : "rgba(255,255,255,0.08)"} />
      <path d="M5 8l3 8 2.5-5.5L13 16l3-8" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="8" r="1.5" fill={c} />
    </svg>
  );
}

function AnthropicLogo({ size = 20, active = false }) {
  const c = active ? "#60a5fa" : "rgba(255,255,255,0.7)";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill={active ? "rgba(96,165,250,0.2)" : "rgba(255,255,255,0.08)"} />
      <path d="M12 5L16.5 17H14.2L13.1 14H10.9L9.8 17H7.5L12 5Z" fill={c} />
      <path d="M11.3 12.2L12 10.1L12.7 12.2H11.3Z" fill={active ? "rgba(14,14,18,0.8)" : "rgba(26,28,34,0.9)"} />
    </svg>
  );
}

function BriefcaseIcon({ size = 16, active = false }) {
  const c = active ? "rgba(99,170,255,0.9)" : "rgba(255,255,255,0.6)";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="9" width="18" height="12" rx="2" stroke={c} strokeWidth="1.5" />
      <path d="M8 9V7a4 4 0 018 0v2" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 14h18" stroke={c} strokeWidth="1.5" />
    </svg>
  );
}

function BellIcon({ size = 16, active = false }) {
  const c = active ? "rgba(99,170,255,0.9)" : "rgba(255,255,255,0.6)";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TriggerIcon({ active = false }) {
  const c = active ? "rgba(255,200,50,0.9)" : "rgba(255,255,255,0.6)";
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TOOL_LOGOS: Record<string, (active: boolean) => JSX.Element> = {
  linkedin:  (a) => <LinkedInLogo  size={28} active={a} />,
  indeed:    (a) => <IndeedLogo    size={28} active={a} />,
  workday:   (a) => <WorkdayLogo   size={28} active={a} />,
  anthropic: (a) => <AnthropicLogo size={28} active={a} />,
};

export default function MockupCard5Automation() {
  const [lit, setLit]     = useState<NodeKey[]>([]);
  const [pulse, setPulse] = useState<NodeKey | null>(null);
  const idx = useRef(0);

  useEffect(() => {
    const iv = setInterval(() => {
      const key = SEQ[idx.current % SEQ.length];
      setLit(prev => [...prev.slice(-3), key]);
      setPulse(key);
      setTimeout(() => setPulse(null), 380);
      idx.current++;
    }, 700);
    return () => clearInterval(iv);
  }, []);

  const isLit = (k: NodeKey) => lit.includes(k);

  const SVG_W = 760, SVG_H = 460;
  const ec = (a: boolean) => a ? "rgba(99,170,255,0.75)" : "rgba(255,255,255,0.16)";
  const ew = (a: boolean) => a ? 1.5 : 1;

  const hPath = (a: NodeDef, b: NodeDef) => {
    const x1 = a.x + a.w, y1 = cy(a), x2 = b.x, y2 = cy(b);
    const dx = (x2 - x1) * 0.55;
    return `M${x1},${y1} C${x1+dx},${y1} ${x2-dx},${y2} ${x2},${y2}`;
  };

  const dPath = (a: NodeDef, b: NodeDef) => {
    const x1 = cx(a), y1 = a.y + a.h, x2 = cx(b), y2 = b.y;
    return `M${x1},${y1} C${x1},${y1+35} ${x2},${y2-35} ${x2},${y2}`;
  };

  const nodeStyle = (k: NodeKey): React.CSSProperties => {
    const n = NODES[k];
    const active = isLit(k);
    const isAgent = n.type === "agent";
    return {
      position: "absolute",
      left: n.x, top: n.y, width: n.w, height: n.h,
      borderRadius: n.type === "tool" ? "50%" : 12,
      background: active
        ? isAgent ? "rgba(59,130,246,0.22)" : "rgba(255,255,255,0.09)"
        : isAgent ? "rgba(38,42,52,0.97)"   : "rgba(24,26,32,0.96)",
      border: active
        ? `1px solid ${isAgent ? "rgba(59,130,246,0.55)" : "rgba(255,255,255,0.30)"}`
        : "0.5px solid rgba(255,255,255,0.10)",
      boxShadow: pulse === k
        ? isAgent ? "0 0 22px rgba(59,130,246,0.45)" : "0 0 14px rgba(255,255,255,0.16)"
        : "none",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 3,
      transition: "background 0.28s, border 0.28s, box-shadow 0.28s",
      cursor: "default", zIndex: 2, overflow: "hidden",
    };
  };

  const connDots: Array<{ x: number; y: number; k: NodeKey }> = [
    { x: NODES.trigger.x + NODES.trigger.w,     y: cy(NODES.trigger),   k: "trigger" },
    { x: NODES.agent.x + NODES.agent.w,         y: cy(NODES.agent),     k: "agent" },
    { x: NODES.condition.x + NODES.condition.w, y: cy(NODES.condition), k: "condition" },
    { x: NODES.apply.x,                         y: cy(NODES.apply),     k: "apply" },
    { x: NODES.notify.x,                        y: cy(NODES.notify),    k: "notify" },
    { x: NODES.agent.x,                         y: cy(NODES.agent),     k: "agent" },
    { x: NODES.condition.x,                     y: cy(NODES.condition), k: "condition" },
  ];

  const gridSize = 20;

  return (
    <div style={{
      background: "rgba(14,14,18,0.97)",
      width: "100%",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      <div style={{ position: "relative", width: "100%", height: SVG_H }}>

        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Subtle dot grid pattern (n8n-style canvas) */}
            <pattern id="canvas-grid" x="0" y="0" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
              <circle cx={gridSize / 2} cy={gridSize / 2} r="1" fill="rgba(255,255,255,0.12)" />
            </pattern>
            <marker id="m-dim" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.22)" />
            </marker>
            <marker id="m-lit" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(99,170,255,0.9)" />
            </marker>
          </defs>

          {/* Subtle grid background */}
          <rect x="0" y="0" width={SVG_W} height={SVG_H} fill="url(#canvas-grid)" />

          {/* trigger → agent */}
          {(() => { const a = isLit("trigger")||isLit("agent"); return (
            <path d={hPath(NODES.trigger, NODES.agent)} stroke={ec(a)} strokeWidth={ew(a)}
              fill="none" markerEnd={a?"url(#m-lit)":"url(#m-dim)"} style={{transition:"stroke 0.28s"}} />
          ); })()}

          {/* agent → condition */}
          {(() => { const a = isLit("agent")||isLit("condition"); return (
            <path d={hPath(NODES.agent, NODES.condition)} stroke={ec(a)} strokeWidth={ew(a)}
              fill="none" markerEnd={a?"url(#m-lit)":"url(#m-dim)"} style={{transition:"stroke 0.28s"}} />
          ); })()}

          {/* condition → apply (true) */}
          {(() => {
            const nd = NODES.condition, nb = NODES.apply;
            const a = isLit("condition")||isLit("apply");
            const x1=nd.x+nd.w, y1=nd.y+16, x2=nb.x, y2=cy(nb), dx=(x2-x1)*0.55;
            return <>
              <path d={`M${x1},${y1} C${x1+dx},${y1} ${x2-dx},${y2} ${x2},${y2}`}
                stroke={ec(a)} strokeWidth={ew(a)} fill="none"
                markerEnd={a?"url(#m-lit)":"url(#m-dim)"} style={{transition:"stroke 0.28s"}} />
              <text x={x1+4} y={y1-5} fontSize={9} fill="rgba(255,255,255,0.32)"></text>
            </>;
          })()}

          {/* condition → notify (false) */}
          {(() => {
            const nd = NODES.condition, nb = NODES.notify;
            const a = isLit("condition")||isLit("notify");
            const x1=nd.x+nd.w, y1=nd.y+nd.h-16, x2=nb.x, y2=cy(nb), dx=(x2-x1)*0.55;
            return <>
              <path d={`M${x1},${y1} C${x1+dx},${y1} ${x2-dx},${y2} ${x2},${y2}`}
                stroke={ec(a)} strokeWidth={ew(a)} fill="none"
                markerEnd={a?"url(#m-lit)":"url(#m-dim)"} style={{transition:"stroke 0.28s"}} />
              <text x={x1+4} y={y1+11} fontSize={9} fill="rgba(255,255,255,0.32)"></text>
            </>;
          })()}

          {/* agent → tools (dashed) */}
          {(["linkedin","indeed","workday","anthropic"] as NodeKey[]).map(k => {
            const a = isLit("agent")||isLit(k);
            return <path key={k} d={dPath(NODES.agent, NODES[k])}
              stroke={a?"rgba(99,170,255,0.5)":"rgba(255,255,255,0.10)"}
              strokeWidth={1} strokeDasharray="4 3" fill="none"
              style={{transition:"stroke 0.28s"}} />;
          })}

          {/* Connector dots */}
          {connDots.map((d,i) => (
            <circle key={i} cx={d.x} cy={d.y} r={3.5}
              fill={isLit(d.k)?"rgba(99,170,255,0.85)":"rgba(255,255,255,0.20)"}
              style={{transition:"fill 0.28s"}} />
          ))}
        </svg>

        {/* HTML Nodes */}
        {(Object.entries(NODES) as [NodeKey, NodeDef][]).map(([k, n]) => (
          <div key={k} style={nodeStyle(k)}>

            {/* TRIGGER */}
            {n.type === "trigger" && <>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: isLit(k) ? "rgba(255,200,50,0.18)" : "rgba(255,255,255,0.07)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.28s",
              }}>
                <TriggerIcon active={isLit(k)} />
              </div>
              <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.45)", textAlign: "center", lineHeight: 1.35, marginTop: 5, padding: "0 8px" }}>{n.label}</div>
            </>}

            {/* AGENT */}
            {n.type === "agent" && <>
              <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 12px" }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: isLit(k) ? "rgba(59,130,246,0.3)" : "rgba(59,130,246,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
                  transition: "background 0.28s",
                }}>🤖</div>
                <div>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 500, lineHeight: 1.2 }}>{n.label}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", marginTop: 2 }}>{n.sub}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
                {["Search","Apply","Tailor"].map(lbl => (
                  <div key={lbl} style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                    <div style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: isLit(k) ? "rgba(99,170,255,0.7)" : "rgba(255,255,255,0.2)",
                      transition: "background 0.28s",
                    }} />
                    {lbl}
                  </div>
                ))}
              </div>
            </>}

            {/* CONDITION */}
            {n.type === "condition" && <>
              <div style={{ fontSize: 21, color: isLit(k) ? "#60a5fa" : "rgba(255,255,255,0.5)", transition: "color 0.28s" }}>⇌</div>
              <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.42)", textAlign: "center", marginTop: 3, lineHeight: 1.3 }}>{n.label}</div>
            </>}

            {/* ACTION */}
            {n.type === "action" && <>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: isLit(k) ? "rgba(59,130,246,0.22)" : "rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.28s",
              }}>
                {k === "apply"
                  ? <BriefcaseIcon size={15} active={isLit(k)} />
                  : <BellIcon size={15} active={isLit(k)} />
                }
              </div>
              <div style={{ fontSize: 10.5, color: isLit(k) ? "#fff" : "rgba(255,255,255,0.72)", fontWeight: 500, marginTop: 5, textAlign: "center", lineHeight: 1.3, transition: "color 0.28s" }}>{n.label}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", textAlign: "center" }}>{n.sub}</div>
              <div style={{
                width: 17, height: 17, borderRadius: "50%",
                border: "0.5px solid rgba(255,255,255,0.16)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginTop: 3, fontSize: 11, color: "rgba(255,255,255,0.32)",
              }}>+</div>
            </>}

            {/* TOOL */}
            {n.type === "tool" && <>
              {TOOL_LOGOS[k]?.(isLit(k))}
              <div style={{ fontSize: 9, color: isLit(k) ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.4)", textAlign: "center", marginTop: 5, lineHeight: 1.3, padding: "0 4px", transition: "color 0.28s" }}>{n.label}</div>
              {n.sub && <div style={{ fontSize: 8, color: "rgba(255,255,255,0.22)", textAlign: "center", marginTop: 1 }}>{n.sub}</div>}
            </>}

          </div>
        ))}
      </div>
    </div>
  );
}