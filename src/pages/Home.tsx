import EcoHeader from "@/components/eco-header";
import LandingContent from "@/components/landing-content";

export default function Home() {
  return (
    <div
      className="min-h-screen"
    >
      <EcoHeader />
      <main>
        <LandingContent />
      </main>
    </div>
  );
}