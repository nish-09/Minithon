import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { quizData, type Answer } from "@/lib/quiz-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Info,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const toastMessages = [
  "Great choice! Every small step counts 🌍.",
  "You're on your way to becoming an eco-hero! 🌱",
  "Keep going! Your choices matter. ✨",
];

export default function QuizForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<(Answer | null)[]>(
    Array(quizData.length).fill(null)
  );
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: "", description: "" });
  const [currentFootprint, setCurrentFootprint] = useState(0);
  const [categoryScores, setCategoryScores] = useState({
    energy: 0,
    transport: 0,
    diet: 0,
    habits: 0,
    waste: 0,
    home: 0,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const scores = {
      energy: 0,
      transport: 0,
      diet: 0,
      habits: 0,
      waste: 0,
      home: 0,
    };
    const counts = { energy: 0, transport: 0, diet: 0, habits: 0, waste: 0, home: 0 };

    answers.forEach((answer, index) => {
      if (answer) {
        const category = quizData[index].category;
        switch (category) {
          case "Energy":
            scores.energy += answer.score;
            counts.energy++;
            break;
          case "Transport":
            scores.transport += answer.score;
            counts.transport++;
            break;
          case "Diet":
            scores.diet += answer.score;
            counts.diet++;
            break;
          case "Daily Habits":
            scores.habits += answer.score;
            counts.habits++;
            break;
          case "Waste Management":
            scores.waste += answer.score;
            counts.waste++;
            break;
          case "Home & Possessions":
            scores.home += answer.score;
            counts.home++;
            break;
        }
      }
    });

    const avgScores = {
      energy: counts.energy > 0 ? scores.energy / counts.energy : 0,
      transport: counts.transport > 0 ? scores.transport / counts.transport : 0,
      diet: counts.diet > 0 ? scores.diet / counts.diet : 0,
      habits: counts.habits > 0 ? scores.habits / counts.habits : 0,
      waste: counts.waste > 0 ? scores.waste / counts.waste : 0,
      home: counts.home > 0 ? scores.home / counts.home : 0,
    };

    setCategoryScores(avgScores);

    const totalScore = Object.values(avgScores).reduce((sum, score) => sum + score, 0) / 6;
    setCurrentFootprint(Math.round(totalScore));
  }, [answers]);

  const handleNext = () => {
    if (currentStep < quizData.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSelect = (answer: Answer) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answer;
    setAnswers(newAnswers);

    const randomToast = toastMessages[Math.floor(Math.random() * toastMessages.length)];
    if (Math.random() > 0.3) {
      toast({ description: randomToast, duration: 2000 });
    }
  };

  const openInfoPopup = (title: string, description: string) => {
    setPopupContent({ title, description });
    setInfoPopupOpen(true);
  };

  const handleSubmit = (finalAnswers: (Answer | null)[]) => {
    const scores = {
      energy: 0,
      transport: 0,
      diet: 0,
      habits: 0,
      waste: 0,
      home: 0,
    };
    const counts = { energy: 0, transport: 0, diet: 0, habits: 0, waste: 0, home: 0 };

    finalAnswers.forEach((answer, index) => {
      if (answer) {
        const category = quizData[index].category;
        switch (category) {
          case "Energy":
            scores.energy += answer.score;
            counts.energy++;
            break;
          case "Transport":
            scores.transport += answer.score;
            counts.transport++;
            break;
          case "Diet":
            scores.diet += answer.score;
            counts.diet++;
            break;
          case "Daily Habits":
            scores.habits += answer.score;
            counts.habits++;
            break;
          case "Waste Management":
            scores.waste += answer.score;
            counts.waste++;
            break;
          case "Home & Possessions":
            scores.home += answer.score;
            counts.home++;
            break;
        }
      }
    });

    const avgScores = {
      energy: counts.energy > 0 ? Math.round((scores.energy / (counts.energy * 10)) * 100) : 0,
      transport: counts.transport > 0 ? Math.round((scores.transport / (counts.transport * 10)) * 100) : 0,
      diet: counts.diet > 0 ? Math.round((scores.diet / (counts.diet * 10)) * 100) : 0,
      habits: counts.habits > 0 ? Math.round((scores.habits / (counts.habits * 10)) * 100) : 0,
      waste: counts.waste > 0 ? Math.round((scores.waste / (counts.waste * 10)) * 100) : 0,
      home: counts.home > 0 ? Math.round((scores.home / (counts.home * 10)) * 100) : 0,
    };

    const query = new URLSearchParams({
      energyScore: avgScores.energy.toString(),
      transportScore: avgScores.transport.toString(),
      dietScore: avgScores.diet.toString(),
      habitsScore: avgScores.habits.toString(),
      wasteScore: avgScores.waste.toString(),
      homeScore: avgScores.home.toString(),
    }).toString();

    navigate(`/results?${query}`);
  };

  const progress = ((currentStep + 1) / quizData.length) * 100;
  const currentQuestion = quizData[currentStep];
  const selectedAnswer = answers[currentStep];
  const answeredQuestions = answers.filter((answer) => answer !== null).length;

 

  // Get footprint level and color
  const getFootprintLevel = (score: number) => {
    if (score <= 20) return { level: "Excellent", color: "text-sky-600", bgColor: "bg-green-100" };
    if (score <= 40) return { level: "Good", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (score <= 60) return { level: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    if (score <= 80) return { level: "Poor", color: "text-orange-600", bgColor: "bg-orange-100" };
    return { level: "Very Poor", color: "text-red-600", bgColor: "bg-red-100" };
  };
  
  const footprintLevel = getFootprintLevel(currentFootprint);
  
  return (
    <div className="container mx-auto max-w-4xl py-8">
      {/* Header with real-time footprint */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Your Carbon Footprint</h1>
            <p className="text-slate-600 dark:text-slate-300">Answer questions to discover your environmental impact</p>
          </div>
        </div>
        
        <Progress value={progress} className="h-3 mb-2" />
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
          <span>Question {currentStep + 1} of {quizData.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>

      {/* Category breakdown */}
      {answeredQuestions > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">Category Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(categoryScores).map(([category, score]) => {
              const level = getFootprintLevel(score);
              const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
              return (
                <div key={category} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${level.bgColor}`}></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{categoryName}</span>
                  <span className={`text-sm ${level.color}`}>{Math.round(score)}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden shadow-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/20 dark:border-slate-700/50">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{currentQuestion.icon}</div>
                  <div>
                    <CardTitle className="text-xl text-slate-800 dark:text-slate-100">{currentQuestion.category}</CardTitle>
                    {currentQuestion.subcategory && (
                      <Badge variant="secondary" className="mt-1">
                        {currentQuestion.subcategory}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => openInfoPopup(currentQuestion.category, currentQuestion.info)}>
                  <Info className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-8 text-center leading-relaxed text-slate-800 dark:text-slate-100">{currentQuestion.question}</h2>
              <RadioGroup
                onValueChange={(value) => handleSelect(currentQuestion.answers.find(a => a.text === value)!)}
                className="space-y-4"
              >
                {currentQuestion.answers.map((answer, index) => {
                  const isLowImpact = answer.score <= 3;
                  const isHighImpact = answer.score >= 7;
                  
                  return (
                    <motion.div
                      key={answer.text}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="w-full"
                    >
                      <RadioGroupItem value={answer.text} id={`q${currentStep}-a${index}`} className="sr-only" />
                      <Label
                        htmlFor={`q${currentStep}-a${index}`}
                        className={cn(
                          "flex flex-col items-start p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 group",
                          "bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-white/20 dark:border-slate-700/50",
                          "hover:border-primary/50 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1",
                          "has-[:checked]:border-primary has-[:checked]:bg-white/55 dark:has-[:checked]:bg-slate-800/55 has-[:checked]:shadow-xl has-[:checked]:scale-[1.03] has-[:checked]:-translate-y-1",
                          isLowImpact && "hover:border-blue-500/50 hover:bg-blue-50/70 dark:hover:bg-blue-900/20 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/60 dark:has-[:checked]:bg-blue-900/15",
                          isHighImpact && "hover:border-red-500/50 hover:bg-red-50/70 dark:hover:bg-red-900/20 has-[:checked]:border-red-500 has-[:checked]:bg-red-50/60 dark:has-[:checked]:bg-red-900/15"
                        )}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <span className="text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                            {answer.text}
                          </span>
                          <div className="flex items-center gap-2">
                            {isLowImpact && <CheckCircle className="w-5 h-5 text-blue-600" />}
                            {isHighImpact && <AlertCircle className="w-5 h-5 text-red-600" />}
                            {answer.score > 3 && answer.score < 7 && <TrendingUp className="w-5 h-5 text-yellow-600" />}
                          </div>
                        </div>
                        {answer.description && (
                          <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">{answer.description}</p>
                        )}
                        {answer.impact && (
                          <Badge 
                            variant={isLowImpact ? "default" : isHighImpact ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {answer.impact}
                          </Badge>
                        )}
                      </Label>
                    </motion.div>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-between items-center mt-8 px-4"
      >
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
        </div>

        <div className="flex gap-3">
          {currentStep === quizData.length - 1 ? (
            <Button
              onClick={() => handleSubmit(answers)}
              disabled={answers[currentStep] === null}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              See Results
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={answers[currentStep] === null}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </motion.div>

      <Dialog open={isInfoPopupOpen} onOpenChange={setInfoPopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary flex items-center gap-2">
              <Info className="w-5 h-5"/> {popupContent.title} Fact
            </DialogTitle>
            <DialogDescription className="pt-4 text-base text-slate-700 dark:text-slate-200">
              {popupContent.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
