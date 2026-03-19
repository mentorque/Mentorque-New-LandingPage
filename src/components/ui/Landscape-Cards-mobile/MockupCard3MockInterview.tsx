import DesktopCard from "../Landscape-cards-desktop/MockupCard3MockInterview";

function MobileCardFrame({
  children,
  scale = 0.86,
  height = 300,
}: {
  children: React.ReactNode;
  scale?: number;
  height?: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 380,
        height,
        margin: "0 auto",
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(12,12,16,0.9)",
      }}
    >
      <div
        style={{
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function MockupCard3MockInterviewMobile() {
  return (
    <MobileCardFrame scale={0.86} height={300}>
      <DesktopCard />
    </MobileCardFrame>
  );
}

