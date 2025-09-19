import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import EcoHeader from "@/components/eco-header";
import ResultsContent from "@/components/results-content";
import { Sprout, Globe, Flame } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export type BadgeInfo = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

export type CommunityMember = {
    name: string;
    score: number;
    avatar: string;
    bio: string;
};

const communityData: CommunityMember[] = [
    { name: "Riya", score: 88, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", bio: "Passionate about zero-waste living and composting." },
    { name: "Alex", score: 92, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d", bio: "Cyclist and advocate for renewable energy sources." },
    { name: "Sam", score: 95, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d", bio: "Loves farmers' markets and sustainable agriculture." },
    { name: "EcoBot", score: 100, avatar: "", bio: "Your friendly AI guide to a greener planet!"},
    { name: "GreenNewbie", score: 75, avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d", bio: "Just starting my eco-journey and excited to learn!"}
];

function getImpactCategory(score: number): { category: string, badge: BadgeInfo } {
  if (score <= 33) {
    return { 
      category: "Low Impact", 
      badge: { name: "Planet Saver", icon: <Sprout className="w-8 h-8"/>, color: "text-primary" } 
    };
  }
  if (score <= 66) {
    return { 
      category: "Medium Impact", 
      badge: { name: "Green Hero", icon: <Globe className="w-8 h-8"/>, color: "text-accent" } 
    };
  }
  return { 
    category: "High Impact", 
    badge: { name: "Eco Rookie", icon: <Flame className="w-8 h-8"/>, color: "text-destructive" } 
  };
}

function getCommunityForScore(score: number): CommunityMember[] {
    // In a real app, this would be a database query.
    // Here, we'll filter the mock data.
    const scoreReversed = 100 - score;
    return communityData.filter(member => Math.abs(member.score - scoreReversed) <= 15 || member.name === "EcoBot");
}

function ResultsSkeleton() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <Skeleton className="h-10 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="space-y-8 lg:col-span-2">
                    <div className="grid md:grid-cols-2 gap-8">
                        <Skeleton className="h-80 rounded-xl" />
                        <Skeleton className="h-80 rounded-xl" />
                    </div>
                    <Skeleton className="h-64 rounded-xl" />
                </div>
                <div className="space-y-8">
                    <Skeleton className="h-60 rounded-xl" />
                    <Skeleton className="h-96 rounded-xl" />
                </div>
            </div>
        </div>
    )
}

function Results() {
  const [searchParams] = useSearchParams();

  const energyScore = Number(searchParams.get('energyScore')) || 50;
  const transportScore = Number(searchParams.get('transportScore')) || 50;
  const dietScore = Number(searchParams.get('dietScore')) || 50;
  const habitsScore = Number(searchParams.get('habitsScore')) || 50;
  const wasteScore = Number(searchParams.get('wasteScore')) || 50;
  const homeScore = Number(searchParams.get('homeScore')) || 50;

  const totalScore = (energyScore + transportScore + dietScore + habitsScore + wasteScore + homeScore) / 6;
  const { category, badge } = getImpactCategory(totalScore);
  const community = getCommunityForScore(totalScore);

  // Generate static tips based on scores
  const generateStaticTips = () => {
    const tips: string[] = [];
    
    // Generate tips based on scores (higher scores = more tips for that category)
    if (energyScore > 60) {
      tips.push("Switch to LED light bulbs to reduce energy consumption by up to 80%.");
      tips.push("Unplug electronics when not in use to eliminate phantom energy waste.");
    }
    
    if (transportScore > 60) {
      tips.push("Use public transportation or carpool at least twice a week.");
      tips.push("Consider walking or biking for short trips under 2 miles.");
    }
    
    if (dietScore > 60) {
      tips.push("Try Meatless Mondays to reduce your carbon footprint by 20%.");
      tips.push("Buy local and seasonal produce to reduce transportation emissions.");
    }
    
    if (habitsScore > 60) {
      tips.push("Take shorter showers to save water and energy.");
      tips.push("Use a reusable water bottle instead of single-use plastic bottles.");
    }
    
    if (wasteScore > 60) {
      tips.push("Start composting food scraps to reduce landfill waste.");
      tips.push("Bring your own shopping bags and containers to stores.");
    }
    
    if (homeScore > 60) {
      tips.push("Seal windows and doors to improve home energy efficiency.");
      tips.push("Set your thermostat 2-3 degrees lower in winter and higher in summer.");
    }
    
    // Add some general tips if we don't have enough
    const generalTips = [
      "Reduce, reuse, and recycle whenever possible.",
      "Support companies with sustainable practices.",
      "Educate others about environmental conservation.",
      "Plant native trees and plants in your garden.",
      "Use energy-efficient appliances when replacing old ones.",
      "Choose products with minimal packaging.",
      "Participate in local environmental initiatives."
    ];
    
    while (tips.length < 7 && generalTips.length > 0) {
      const randomTip = generalTips.splice(Math.floor(Math.random() * generalTips.length), 1)[0];
      tips.push(randomTip);
    }
    
    return tips.slice(0, 7);
  };

  const tips = generateStaticTips();

  return <ResultsContent 
    score={totalScore} 
    category={category} 
    badge={badge} 
    tips={tips} 
    community={community}
    energyScore={energyScore}
    transportScore={transportScore}
    dietScore={dietScore}
    habitsScore={habitsScore}
    wasteScore={wasteScore}
    homeScore={homeScore}
  />;
}

export default function ResultsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <EcoHeader />
      <main className="flex-grow">
        <Suspense fallback={<ResultsSkeleton/>}>
          <Results />
        </Suspense>
      </main>
    </div>
  );
}