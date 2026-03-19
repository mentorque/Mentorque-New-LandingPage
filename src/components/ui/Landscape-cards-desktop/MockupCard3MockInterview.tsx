export default function MockupCard3MockInterview() {
  return (
    <div className="mc-c3">
      <div className="mc-c3-header">
        <span className="mc-c3-title">Mock interview · Round 4 of 5</span>
        <div className="mc-c3-deploy">▶ Start session</div>
      </div>
      <div className="mc-c3-body">
        <div className="mc-c3-sc-head">
          <div className="mc-c3-sc-num">1</div>
          <span className="mc-c3-sc-label">Scenario: System design — URL shortener</span>
        </div>
        <div className="mc-c3-row">
          <span className="mc-c3-row-icon">💬</span>{" "}
          <span style={{ color: "rgba(255,255,255,0.3)" }}>Mentor says:</span> &nbsp;&quot;Walk me through your high-level design.&quot;
        </div>
        <div className="mc-c3-row">
          <span className="mc-c3-arrow">↳</span> Strong answer: <span className="mc-chip green">deep_dive</span> → proceed to{" "}
          <span style={{ color: "rgba(255,255,255,0.5)", marginLeft: 2 }}>Scale constraints</span>
        </div>
        <div className="mc-c3-row">
          <span className="mc-c3-arrow">↳</span> Vague answer: <span className="mc-chip red">clarify</span> → retry with{" "}
          <span style={{ color: "rgba(255,255,255,0.5)", marginLeft: 2 }}>Hint given</span>
        </div>
        <div className="mc-c3-sc2">
          <div className="mc-c3-sc2-head">
            <div className="mc-c3-sc-num">2</div>
            <span className="mc-c3-sc2-label">Scenario: Behavioural — conflict resolution</span>
          </div>
          <div className="mc-c3-row">
            <span className="mc-c3-arrow">↳</span> STAR format used: <span className="mc-chip blue">accepted</span> → Feedback + score
          </div>
          <div className="mc-c3-row">
            <span className="mc-c3-arrow">↳</span> No structure: <span className="mc-chip red">needs_work</span> → re-attempt
          </div>
        </div>
      </div>
    </div>
  );
}
