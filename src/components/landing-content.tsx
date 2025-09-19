import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Earth, CheckCircle, Wind, Footprints, Leaf, Zap, Car, Home, Recycle, TrendingUp, AlertTriangle, Target, Users, BarChart3, Clock, Lightbulb } from "lucide-react";
import { useTypingEffect, useCountUpEffect, useCountUpFloatEffect } from "@/hooks/use-typing-effect";
import Globe3D from "./globe-3d";

export default function LandingContent() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsInView, setStatsInView] = useState(false);
  
  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);
  
  // Typing effects for climate stats
  const tempRise = useCountUpFloatEffect(1.1, 3000, 0, 1);
  const co2Increase = useCountUpEffect(50, 3000, 0);
  const { displayedText: netZeroTarget, isComplete: netZeroComplete } = useTypingEffect("2050", 150, statsInView);
  const parisGoal = useCountUpFloatEffect(1.5, 3000, 0, 1);
  
  // Counting effects for emission percentages
  const electricityPercent = useCountUpEffect(25, 3000, 0);
  const transportPercent = useCountUpEffect(14, 3000, 0);
  const buildingsPercent = useCountUpEffect(6, 3000, 0);
  const agriculturePercent = useCountUpEffect(24, 3000, 0);
  
  // Counting effects for country footprints
  const usFootprint = useCountUpFloatEffect(16.5, 3000, 0, 1);
  const ausFootprint = useCountUpFloatEffect(15.4, 3000, 0, 1);
  const canFootprint = useCountUpFloatEffect(15.1, 3000, 0, 1);
  const gerFootprint = useCountUpFloatEffect(9.7, 3000, 0, 1);
  const ukFootprint = useCountUpFloatEffect(8.5, 3000, 0, 1);
  const chinaFootprint = useCountUpFloatEffect(7.4, 3000, 0, 1);
  const brazilFootprint = useCountUpFloatEffect(2.2, 3000, 0, 1);
  const indiaFootprint = useCountUpFloatEffect(1.9, 3000, 0, 1);

  return (
    <div className="relative overflow-hidden text-white">
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/assets/images/bg.jpg')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      ></div>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 items-center gap-12 min-h-[calc(100vh-4rem)] py-12 md:py-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl p-8 rounded-2xl text-white bg-transparent"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 font-headline">
              What's your Ecological Footprint?
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Discover your impact on the planet and get personalized insights to live more sustainably. Your journey to a smaller footprint starts here.
            </p>
            <Link to="/quiz">
              <Button size="lg" className="text-lg px-12 py-7 rounded-full font-bold group">
                Calculate Your Footprint <Footprints className="ml-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[400px] lg:h-[500px] rounded-lg overflow-hidden"
          >
            <Globe3D onGlobeClick={() => setPopupOpen(true)} />
          </motion.div>
        </div>
      </div>

      <motion.div 
        ref={statsRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
        className="py-16 text-white bg-transparent"
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl text-left">
          {[
            { icon: <Earth className="w-10 h-10 text-primary mb-4"/>, title: "Discover Your Impact", description: "Our quiz calculates your personal Ecological Footprint and reveals how your lifestyle choices affect the planet." },
            { icon: <CheckCircle className="w-10 h-10 text-primary mb-4"/>, title: "Take Meaningful Action", description: "Receive a personalized action plan with AI-powered tips to help you reduce your footprint effectively." },
            { icon: <Wind className="w-10 h-10 text-primary mb-4"/>, title: "Drive Global Change", description: "Join a community of change-makers and contribute to a more sustainable future, one conscious choice at a time." },
          ].map((feature) => (
            <motion.div 
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="flex flex-col items-start p-6 rounded-lg bg-transparent"
            >
              {feature.icon}
              <h3 className="text-2xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* What is Carbon Footprint Section */}
      <motion.section 
        id="carbon-footprint"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
        className="py-20 bg-transparent text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What is a Carbon Footprint?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A carbon footprint is the total amount of greenhouse gases (including carbon dioxide and methane) 
              that are generated by our actions. Understanding your footprint is the first step toward reducing it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <BarChart3 className="w-12 h-12 text-primary mb-4" />,
                title: "Direct Emissions",
                description: "Emissions from activities you directly control, like driving your car or heating your home."
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-primary mb-4" />,
                title: "Indirect Emissions",
                description: "Emissions from the production of goods and services you consume, like food and clothing."
              },
              {
                icon: <Earth className="w-12 h-12 text-primary mb-4" />,
                title: "Global Impact",
                description: "Your individual choices contribute to the global carbon budget and climate change."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
                }}
                className="text-center p-6 rounded-lg bg-transparent border border-white/20"
              >
                {item.icon}
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Carbon Footprint Matters Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-transparent text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Your Carbon Footprint Matters
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Climate change is one of the most pressing challenges of our time, and every individual's choices 
              contribute to the solution or the problem.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >
              <h3 className="text-3xl font-bold mb-6">The Science Behind Climate Change</h3>
              <div className="space-y-4 text-white/80">
                <p>
                  Greenhouse gases like carbon dioxide trap heat in Earth's atmosphere, creating a "greenhouse effect" 
                  that warms our planet. Since the Industrial Revolution, human activities have increased atmospheric 
                  CO₂ levels by over 50%.
                </p>
                <p>
                  The average global temperature has risen by about 1.1°C since pre-industrial times, with most of 
                  this warming occurring in the past 40 years. This seemingly small increase has already caused 
                  significant changes to our climate system.
                </p>
                <p>
                  To limit global warming to 1.5°C above pre-industrial levels (as recommended by the Paris Agreement), 
                  we need to reach net-zero emissions by 2050. This means reducing our individual carbon footprints 
                  and transitioning to a carbon-neutral society.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
              }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: <AlertTriangle className="w-8 h-8 text-red-500" />, stat: `${tempRise}°C`, label: "Global Temperature Rise" },
                { icon: <TrendingUp className="w-8 h-8 text-orange-500" />, stat: `${co2Increase}%`, label: "CO₂ Increase Since 1850" },
                { icon: <Clock className="w-8 h-8 text-yellow-500" />, stat: netZeroTarget, label: "Net-Zero Target" },
                { icon: <Target className="w-8 h-8 text-green-500" />, stat: `${parisGoal}°C`, label: "Paris Agreement Goal" }
              ].map((item) => (
                <div key={item.label} className="text-center p-4 rounded-lg bg-transparent border border-white/20">
                  {item.icon}
                  <div className="text-2xl font-bold mt-2">
                    {item.label === "Net-Zero Target" ? (
                      <span>
                        {item.stat}
                        {!netZeroComplete && <span className="animate-pulse">|</span>}
                      </span>
                    ) : (
                      item.stat
                    )}
                  </div>
                  <div className="text-sm text-white/80">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Major Sources of Carbon Emissions Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-transparent text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Major Sources of Carbon Emissions
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Understanding where emissions come from helps us identify the most impactful changes we can make.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: <Zap className="w-12 h-12 text-blue-500 mb-4" />,
                title: "Electricity & Heat",
                percentage: `${electricityPercent}%`,
                description: "Power generation and heating systems are the largest source of global emissions."
              },
              {
                icon: <Car className="w-12 h-12 text-red-500 mb-4" />,
                title: "Transportation",
                percentage: `${transportPercent}%`,
                description: "Cars, trucks, ships, and planes contribute significantly to global emissions."
              },
              {
                icon: <Home className="w-12 h-12 text-green-500 mb-4" />,
                title: "Buildings",
                percentage: `${buildingsPercent}%`,
                description: "Heating, cooling, and powering buildings accounts for a substantial portion."
              },
              {
                icon: <Leaf className="w-12 h-12 text-orange-500 mb-4" />,
                title: "Agriculture",
                percentage: `${agriculturePercent}%`,
                description: "Food production, livestock, and land use changes drive agricultural emissions."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
                }}
                className="text-center p-6 rounded-lg bg-transparent border border-white/20 hover:shadow-lg transition-shadow"
              >
                {item.icon}
                <div className="text-3xl font-bold text-primary mb-2 transition-all duration-300 hover:scale-110">
                  {item.percentage}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Individual Impact Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-transparent text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Individual Impact
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              While climate change is a global issue, individual actions collectively make a significant difference. 
              Every choice you make contributes to either the problem or the solution.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >
              <h3 className="text-3xl font-bold mb-6">The Power of Individual Action</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Collective Impact</h4>
                    <p className="text-white/80">
                      When millions of people make small changes, the cumulative effect can be enormous. 
                      Individual actions can influence policy, business practices, and social norms.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Lightbulb className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Behavioral Change</h4>
                    <p className="text-white/80">
                      Your sustainable choices can inspire others and create a ripple effect in your community, 
                      workplace, and social circles.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Recycle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Market Influence</h4>
                    <p className="text-white/80">
                      Consumer demand drives business decisions. By choosing sustainable products and services, 
                      you're voting with your wallet for a greener economy.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
              }}
              className="p-8 rounded-lg bg-transparent border border-white/20"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Average Carbon Footprint by Country</h3>
              <div className="space-y-4">
                {[
                  { country: "United States", footprint: usFootprint, color: "bg-red-500" },
                  { country: "Australia", footprint: ausFootprint, color: "bg-orange-500" },
                  { country: "Canada", footprint: canFootprint, color: "bg-yellow-500" },
                  { country: "Germany", footprint: gerFootprint, color: "bg-blue-500" },
                  { country: "United Kingdom", footprint: ukFootprint, color: "bg-indigo-500" },
                  { country: "China", footprint: chinaFootprint, color: "bg-purple-500" },
                  { country: "Brazil", footprint: brazilFootprint, color: "bg-green-500" },
                  { country: "India", footprint: indiaFootprint, color: "bg-emerald-500" }
                ].map((item) => (
                  <div key={item.country} className="flex items-center justify-between">
                    <span className="font-medium">{item.country}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-white/20 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${(item.footprint / 16.5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold w-12 text-right transition-all duration-300 hover:scale-110">
                        {item.footprint} t
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/80 mt-4 text-center">
                Tons of CO₂ equivalent per person per year
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 bg-transparent text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Take our comprehensive quiz to discover your personal carbon footprint and get 
              personalized recommendations to reduce your environmental impact.
            </p>
            <Link to="/quiz">
              <Button size="lg" className="text-lg px-12 py-7 rounded-full font-bold group bg-primary hover:bg-primary/90">
                Calculate Your Footprint Now 
                <Footprints className="ml-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-white/80 mt-4">
              Takes about 5 minutes • Completely free • Get instant results
            </p>
          </motion.div>
        </div>
      </motion.section>

      <Dialog open={isPopupOpen} onOpenChange={setPopupOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-primary flex items-center gap-2">
              <span className="text-2xl">🌍</span> One Planet Living
            </DialogTitle>
            <DialogDescription className="pt-4 text-lg text-white">
              For over 50 years, humanity has been in ecological overshoot. This means we demand more from nature than our planet can regenerate in a year. It's time to change that.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
