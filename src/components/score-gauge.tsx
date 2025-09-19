"use client";

import { motion } from "framer-motion";

const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScoreGauge({ value }: { value: number }) {
  const arcOffset = (1 - value / 100) * CIRCUMFERENCE;

  // Lower score is better, so we reverse the colors.
  // Low score (good) = green
  // Medium score = orange
  // High score (bad) = red
  let color = "hsl(var(--primary))"; // Green for low scores
  if (value > 33 && value <= 66) {
    color = "hsl(var(--accent))"; // Orange-ish for medium
  } else if (value > 66) {
    color = "hsl(var(--destructive))"; // Red for high scores
  }

  return (
    <div className="relative w-48 h-48">
      <svg width="192" height="192" viewBox="0 0 192 192" className="-rotate-90">
        <circle
          cx="96"
          cy="96"
          r={RADIUS}
          fill="transparent"
          stroke="hsl(var(--muted))"
          strokeWidth="16"
        />
        <motion.circle
          cx="96"
          cy="96"
          r={RADIUS}
          fill="transparent"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: arcOffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center"
        >
        <span className="text-5xl font-bold" style={{color: color}}>
          {Math.round(value)}
        </span>
        <span className="text-sm font-medium text-muted-foreground">/ 100</span>
      </motion.div>
    </div>
  );
}
