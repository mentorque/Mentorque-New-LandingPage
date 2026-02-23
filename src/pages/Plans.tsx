import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection3 from "@/components/ui/pricing-section-3";

export default function Plans() {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 25%, #c7d2fe 50%, #a5b4fc 75%, #8b5cf6 100%)",
      }}
    >
      <Navbar />
      <main>
        <PricingSection3 />
      </main>
      <Footer />
    </div>
  );
}
