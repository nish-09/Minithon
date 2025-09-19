import { useState } from "react";
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
import { Earth, CheckCircle, Wind, Footprints } from "lucide-react";
import Globe3D from "./globe-3d";

export default function LandingContent() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/10 -z-10"></div>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 items-center gap-12 min-h-[calc(100vh-4rem)] py-12 md:py-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-6 font-headline">
              What's your Ecological Footprint?
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover your impact on the planet and get personalized insights to live more sustainably. Your journey to a smaller footprint starts here.
            </p>
            <Link to="/quiz">
              <Button size="lg" className="text-lg px-12 py-7 rounded-full font-bold group">
                Take the Quiz <Footprints className="ml-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[400px] lg:h-[500px]"
          >
            <Globe3D onGlobeClick={() => setPopupOpen(true)} />
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
        className="bg-secondary/50 py-16"
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
              className="flex flex-col items-start p-6 rounded-lg "
            >
              {feature.icon}
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Dialog open={isPopupOpen} onOpenChange={setPopupOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-primary flex items-center gap-2">
              <span className="text-2xl">🌍</span> One Planet Living
            </DialogTitle>
            <DialogDescription className="pt-4 text-lg text-foreground">
              For over 50 years, humanity has been in ecological overshoot. This means we demand more from nature than our planet can regenerate in a year. It's time to change that.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
