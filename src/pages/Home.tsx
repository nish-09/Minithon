import EcoHeader from "@/components/eco-header";
import LandingContent from "@/components/landing-content";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <EcoHeader />
      <main className="flex-grow">
        <LandingContent />
      </main>
    </div>
  );
}