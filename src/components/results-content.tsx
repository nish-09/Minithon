"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ScoreGauge from "./score-gauge";
import CarbonMolecule3D from "./carbon-molecule-3d";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Award, Bike, Bot, CheckCircle, Info, Leaf, MessageSquare, Share2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { BadgeInfo, CommunityMember } from "@/pages/Results";
import { cn } from "@/lib/utils";
import ResultsCharts from "./results-charts";

type ResultsContentProps = {
  score: number;
  category: string;
  badge: BadgeInfo;
  tips: string[];
  community: CommunityMember[];
  energyScore: number;
  transportScore: number;
  dietScore: number;
  habitsScore: number;
  wasteScore: number;
  homeScore: number;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
};

export default function ResultsContent({ 
  score, 
  category, 
  badge, 
  tips, 
  community,
  energyScore,
  transportScore,
  dietScore,
  habitsScore,
  wasteScore,
  homeScore
}: ResultsContentProps) {
  const [isMoleculeInfoOpen, setMoleculeInfoOpen] = useState(false);
  const [isBadgePopupOpen, setBadgePopupOpen] = useState(false);
  const [isShareCardOpen, setShareCardOpen] = useState(false);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();


  // Calculate detailed metrics
  const getFootprintLevel = (score: number) => {
    if (score <= 20) return { level: "Excellent", color: "text-green-600", bgColor: "bg-green-100", description: "You're doing amazing! Keep up the great work." };
    if (score <= 40) return { level: "Good", color: "text-blue-600", bgColor: "bg-blue-100", description: "You're on the right track with some room for improvement." };
    if (score <= 60) return { level: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-100", description: "There's significant potential to reduce your impact." };
    if (score <= 80) return { level: "Poor", color: "text-orange-600", bgColor: "bg-orange-100", description: "Your footprint is above average - time for action!" };
    return { level: "Very Poor", color: "text-red-600", bgColor: "bg-red-100", description: "Your footprint is very high - every change counts!" };
  };

  const footprintLevel = getFootprintLevel(score);
  const co2Equivalent = Math.round(score * 2.5); // Rough conversion to tons CO2/year
  const treesNeeded = Math.round(score * 0.8); // Trees needed to offset
  const earthsNeeded = (score / 100).toFixed(1);

  useEffect(() => {
    const badgeTimer = setTimeout(() => setBadgePopupOpen(true), 1200);
    const tipTimer = setTimeout(() => {
        toast({
            title: "Eco Fact of the Day",
            description: "Switching 2 car rides per week with cycling can save 90 kg of CO₂ yearly!",
            action: <Bike className="text-primary w-8 h-8"/>
        })
    }, 3000);

    return () => {
        clearTimeout(badgeTimer);
        clearTimeout(tipTimer);
    };
  }, [toast]);
  
  const handleConnect = (name: string) => {
    toast({
        title: "Community Connect",
        description: `A connection request has been sent to ${name}! In a real app, this would initiate a chat or friend request.`,
    });
  }

  const scoreReversed = 100 - score;

  return (
      <div className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Your Carbon Footprint Results</h1>
          <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto">
            Your environmental impact score is <span className={`font-semibold ${footprintLevel.color}`}>{score}/100</span>. 
            {footprintLevel.description}
          </p>
        </motion.div>

        {/* Key Metrics Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="text-center p-6 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/20 dark:border-slate-700/50 shadow-lg">
            <div className="text-3xl font-bold text-primary mb-2">{co2Equivalent}</div>
            <div className="text-sm text-muted-foreground">Tons CO₂/year</div>
          </Card>
          <Card className="text-center p-6 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/20 dark:border-slate-700/50 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">{treesNeeded}</div>
            <div className="text-sm text-muted-foreground">Trees to offset</div>
          </Card>
          <Card className="text-center p-6 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/20 dark:border-slate-700/50 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{earthsNeeded}</div>
            <div className="text-sm text-muted-foreground">Earths needed</div>
          </Card>
          <Card className="text-center p-6 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/20 dark:border-slate-700/50 shadow-lg">
            <div className={`text-3xl font-bold mb-2 ${footprintLevel.color}`}>{footprintLevel.level}</div>
            <div className="text-sm text-muted-foreground">Impact Level</div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="space-y-8 lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-8">
                <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible">
                    <Card className="h-full flex flex-col items-center justify-center text-center bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="text-2xl">Your Impact Score</CardTitle>
                        <CardDescription>Lower score is better!</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4 p-6">
                        <ScoreGauge value={score} />
                        <div className="flex items-center gap-2">
                          <span className={cn("text-2xl font-bold", score > 66 ? "text-destructive" : score > 33 ? "text-accent" : "text-primary")}>{category}</span>
                        </div>
                    </CardContent>
                    </Card>
                </motion.div>

                <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible">
                    <Card className="h-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="text-primary" /> Personalized Eco Tips
                            </CardTitle>
                            <CardDescription>Your personalized action plan to reduce your carbon footprint.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-3">
                            {tips.map((tip, index) => (
                                <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + index * 0.15 }}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                  selectedTip === index 
                                    ? 'border-primary bg-primary/10 shadow-md' 
                                    : 'border-muted hover:border-primary/50 hover:bg-primary/5'
                                }`}
                                onClick={() => setSelectedTip(selectedTip === index ? null : index)}
                                >
                                <div className="flex items-start gap-3">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                    selectedTip === index ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                  }`}>
                                    {index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{tip}</p>
                                    {selectedTip === index && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-2 text-sm text-muted-foreground"
                                      >
                                        This action can help reduce your carbon footprint by focusing on one of your highest-impact areas.
                                      </motion.div>
                                    )}
                                  </div>
                                </div>
                                </motion.div>
                            ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Detailed Analysis Section */}
            <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible" className="flex justify-center w-full">
              <Card className="w-full max-w-5xl mx-auto bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="text-primary" />
                    Detailed Analysis
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
                      className="ml-auto"
                    >
                      {showDetailedAnalysis ? 'Hide' : 'Show'} Details
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Understanding your carbon footprint breakdown and environmental impact.
                  </CardDescription>
                </CardHeader>
                {showDetailedAnalysis && (
                  <CardContent className="p-8">
                    <div className="space-y-8 text-center max-w-4xl mx-auto">
                      <div>
                        <h4 className="font-semibold mb-4 text-lg">What this means:</h4>
                        <p className="text-muted-foreground text-base leading-relaxed">
                          Your carbon footprint of {co2Equivalent} tons CO₂ per year means you would need {earthsNeeded} Earths 
                          if everyone lived like you. This is {score > 50 ? 'above' : 'below'} the global average of 4.8 tons per person.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-4 text-lg">How to improve:</h4>
                        <ul className="space-y-3 text-base text-muted-foreground text-left max-w-2xl mx-auto">
                          <li>• Focus on the highest-impact areas first (transport, energy, diet)</li>
                          <li>• Small changes can make a big difference over time</li>
                          <li>• Track your progress and celebrate improvements</li>
                          <li>• Share your journey with others for motivation</li>
                        </ul>
                      </div>

                      <div className="bg-muted/50 p-6 rounded-lg max-w-3xl mx-auto">
                        <h4 className="font-semibold mb-3 text-primary text-lg">Did you know?</h4>
                        <p className="text-base text-muted-foreground">
                          If you reduce your footprint by just 20%, you could save {Math.round(co2Equivalent * 0.2)} tons of CO₂ annually - 
                          equivalent to planting {Math.round(treesNeeded * 0.2)} trees!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>

            {/* Interactive Charts Section */}
            <motion.div custom={4} variants={cardVariants} initial="hidden" animate="visible" className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/20 dark:border-slate-700/50 rounded-xl shadow-lg">
              <ResultsCharts
                energyScore={energyScore}
                transportScore={transportScore}
                dietScore={dietScore}
                habitsScore={habitsScore}
                wasteScore={wasteScore}
                homeScore={homeScore}
                totalScore={score}
              />
            </motion.div>

             <motion.div custom={5} variants={cardVariants} initial="hidden" animate="visible">
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Users /> Community Hub</CardTitle>
                    <CardDescription>Connect with others who have a similar eco-score ({Math.round(scoreReversed-5)} - {Math.round(scoreReversed+5)}).</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    {community.map((user) => (
                      <motion.div 
                        key={user.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + community.indexOf(user) * 0.1 }}
                        className="flex items-center justify-between bg-muted/30 p-3 rounded-lg"
                        >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name === "EcoBot" ? <Bot/> : user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-bold text-base">{user.name}</span>
                            <p className="text-sm text-muted-foreground">{user.bio}</p>
                          </div>
                        </div>
                        {user.name !== "EcoBot" && (
                            <Button size="sm" variant="outline" onClick={() => handleConnect(user.name)}>
                                <MessageSquare className="mr-2 h-4 w-4"/> Connect
                            </Button>
                        )}
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
            </motion.div>
          </div>
          
          <div className="space-y-8">
             <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible">
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/20 dark:border-slate-700/50 shadow-lg text-center relative h-60 hover:shadow-xl transition-shadow duration-300">
                  <CarbonMolecule3D onMoleculeClick={() => setMoleculeInfoOpen(true)} />
                </Card>
             </motion.div>
             <motion.div custom={5} variants={cardVariants} initial="hidden" animate="visible">
                <Card className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold mb-4">Share Your Progress!</h3>
                    <p className="text-muted-foreground mb-6">Inspire others by sharing your commitment to a greener planet.</p>
                    <Button size="lg" onClick={() => setShareCardOpen(true)}>
                        <Share2 className="mr-2 h-5 w-5" /> Share My Eco Score
                    </Button>
                </Card>
            </motion.div>
          </div>

        </div>

        <Dialog open={isMoleculeInfoOpen} onOpenChange={setMoleculeInfoOpen}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-primary flex items-center gap-2"><Info />Carbon Dioxide (CO₂)</DialogTitle>
                <DialogDescription className="pt-4 text-base text-foreground">
                Carbon dioxide is the primary greenhouse gas emitted through human activities, mainly from burning fossil fuels for energy and transportation. While essential for plant life, excess CO₂ in the atmosphere traps heat, leading to global warming. Your score reflects your estimated contribution.
                </DialogDescription>
            </DialogHeader>
            </DialogContent>
        </Dialog>
        
        <Dialog open={isBadgePopupOpen} onOpenChange={setBadgePopupOpen}>
            <DialogContent>
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }} className="flex flex-col items-center text-center p-6">
                <Award className="w-24 h-24 text-yellow-400 drop-shadow-lg" />
                <DialogTitle className="text-2xl font-bold mt-4">Congratulations!</DialogTitle>
                <DialogDescription className="text-lg mt-2">You've earned the</DialogDescription>
                <div className={cn("flex items-center gap-2 text-2xl font-bold mt-2", badge.color)}>
                {badge.icon} {badge.name}
                </div>
                <p className="text-muted-foreground mt-4">This badge recognizes your commitment to making a positive impact on the environment.</p>
            </motion.div>
            </DialogContent>
        </Dialog>
        
        <Dialog open={isShareCardOpen} onOpenChange={setShareCardOpen}>
            <DialogContent>
                <Card className="border-none shadow-none">
                    <CardHeader>
                        <CardTitle>Share Your Achievement!</CardTitle>
                        <CardDescription>Let your friends know about your commitment to a greener planet.</CardDescription>
                    </CardHeader>
                    <CardContent className="bg-gradient-to-br from-primary/80 to-accent/80 rounded-lg p-6 text-primary-foreground">
                        <div className="text-center mb-4">
                            <Leaf className="w-12 h-12 mx-auto mb-2"/>
                            <h3 className="font-bold text-xl">I'm an EcoImpact Explorer!</h3>
                        </div>
                        <p className="text-center text-lg">My carbon footprint is <span className="font-bold">{category}</span> and I earned the <span className="font-bold">{badge.name}</span> badge!</p>
                        <p className="text-center mt-4 text-sm opacity-80">#EcoImpactExplorer #Sustainability #GoGreen</p>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
      </div>
  );
}
