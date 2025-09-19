export type Answer = {
  text: string;
  score: number;
  description?: string;
  impact?: string;
};

export type Question = {
  question: string;
  answers: Answer[];
  category: "Energy" | "Transport" | "Diet" | "Daily Habits" | "Waste Management" | "Home & Possessions";
  info: string;
  icon?: string;
  subcategory?: string;
};

export const quizData: Question[] = [
  // ENERGY QUESTIONS
  {
    question: "How do you primarily heat your home?",
    answers: [
      { text: "Renewable energy (solar, geothermal)", score: 0, description: "Excellent choice!", impact: "Minimal carbon footprint" },
      { text: "Natural gas", score: 5, description: "Moderate impact", impact: "Some emissions" },
      { text: "Electricity (from grid)", score: 7, description: "Depends on grid mix", impact: "Varies by region" },
      { text: "Heating oil or coal", score: 10, description: "High impact", impact: "Significant emissions" },
    ],
    category: "Energy",
    subcategory: "Heating",
    info: "Heating and cooling account for about 48% of the energy use in a typical U.S. home, making your choice of energy source a major factor.",
    icon: "🔥"
  },
  {
    question: "What type of electricity powers your home?",
    answers: [
      { text: "100% renewable (solar, wind, hydro)", score: 0, description: "Perfect!", impact: "Zero emissions" },
      { text: "Mixed renewable and conventional", score: 4, description: "Good progress", impact: "Reduced emissions" },
      { text: "Mostly conventional grid", score: 7, description: "Room for improvement", impact: "Moderate emissions" },
      { text: "I don't know", score: 8, description: "Check with your utility", impact: "Unknown impact" },
    ],
    category: "Energy",
    subcategory: "Electricity",
    info: "The carbon intensity of electricity varies greatly by region. Renewable energy sources have the lowest carbon footprint.",
    icon: "⚡"
  },
  {
    question: "How often do you unplug electronics or use power strips?",
    answers: [
      { text: "Always - everything unplugged", score: 0, description: "Energy saver!", impact: "Minimal phantom load" },
      { text: "Most electronics on power strips", score: 3, description: "Good habit", impact: "Low phantom load" },
      { text: "Sometimes, when I remember", score: 6, description: "Inconsistent", impact: "Moderate phantom load" },
      { text: "Never - everything stays plugged in", score: 10, description: "High energy waste", impact: "Significant phantom load" },
    ],
    category: "Energy",
    subcategory: "Efficiency",
    info: "Phantom load from electronics can account for up to 10% of household energy consumption. Power strips can help eliminate this waste.",
    icon: "🔌"
  },

  // TRANSPORT QUESTIONS
  {
    question: "What's your primary mode of transportation for daily commutes?",
    answers: [
      { text: "Walking or cycling", score: 0, description: "Zero emissions!", impact: "No carbon footprint" },
      { text: "Public transport", score: 3, description: "Efficient choice", impact: "Low per-person emissions" },
      { text: "Electric vehicle", score: 2, description: "Clean driving", impact: "Minimal emissions" },
      { text: "Gasoline car (solo)", score: 10, description: "High impact", impact: "Significant emissions" },
      { text: "Carpooling", score: 5, description: "Better than solo", impact: "Reduced per-person impact" },
    ],
    category: "Transport",
    subcategory: "Commuting",
    info: "Transportation accounts for 29% of U.S. greenhouse gas emissions. Active transport and public transit have the lowest impact.",
    icon: "🚗"
  },
  {
    question: "How many round-trip flights do you take per year?",
    answers: [
      { text: "None", score: 0, description: "Stay grounded!", impact: "No flight emissions" },
      { text: "1-2 short flights (<3 hours)", score: 4, description: "Occasional travel", impact: "Low flight impact" },
      { text: "1-2 long flights (>3 hours)", score: 8, description: "Significant impact", impact: "High flight emissions" },
      { text: "3-5 flights", score: 12, description: "Frequent flyer", impact: "Very high emissions" },
      { text: "More than 5 flights", score: 15, description: "Heavy traveler", impact: "Extremely high emissions" },
    ],
    category: "Transport",
    subcategory: "Flying",
    info: "A single round-trip flight from NYC to London generates more CO₂ than the average person in many countries produces in a year.",
    icon: "✈️"
  },
  {
    question: "How many miles do you drive per year?",
    answers: [
      { text: "0-2,000 miles", score: 2, description: "Minimal driving", impact: "Very low impact" },
      { text: "2,000-8,000 miles", score: 5, description: "Light driving", impact: "Low impact" },
      { text: "8,000-15,000 miles", score: 8, description: "Average driving", impact: "Moderate impact" },
      { text: "15,000-25,000 miles", score: 12, description: "Heavy driving", impact: "High impact" },
      { text: "More than 25,000 miles", score: 15, description: "Very heavy driving", impact: "Very high impact" },
    ],
    category: "Transport",
    subcategory: "Driving",
    info: "The average American drives about 13,500 miles per year. Reducing driving through alternatives can significantly cut emissions.",
    icon: "🛣️"
  },

  // DIET QUESTIONS
  {
    question: "How often do you eat meat?",
    answers: [
      { text: "Never (vegan)", score: 0, description: "Plant-powered!", impact: "Minimal food emissions" },
      { text: "Rarely (vegetarian)", score: 2, description: "Mostly plants", impact: "Low food emissions" },
      { text: "A few times a week", score: 5, description: "Moderate meat", impact: "Moderate food emissions" },
      { text: "Most days", score: 8, description: "Regular meat eater", impact: "High food emissions" },
      { text: "Every meal", score: 12, description: "Heavy meat diet", impact: "Very high food emissions" },
    ],
    category: "Diet",
    subcategory: "Meat Consumption",
    info: "Meat production generates 5-10x more greenhouse gases than plant-based foods. Reducing meat consumption is one of the most effective climate actions.",
    icon: "🥩"
  },
  {
    question: "How much of your food is locally sourced?",
    answers: [
      { text: "Most food is local/seasonal", score: 1, description: "Local champion!", impact: "Minimal transport emissions" },
      { text: "Some local, some imported", score: 4, description: "Mixed sourcing", impact: "Moderate transport impact" },
      { text: "Mostly from grocery stores", score: 7, description: "Conventional sourcing", impact: "Higher transport impact" },
      { text: "I don't know", score: 6, description: "Unclear sourcing", impact: "Unknown transport impact" },
    ],
    category: "Diet",
    subcategory: "Food Sourcing",
    info: "Locally sourced food reduces transportation emissions. Seasonal eating also reduces the need for energy-intensive storage and transport.",
    icon: "🌱"
  },
  {
    question: "How much food do you waste?",
    answers: [
      { text: "Almost none - I'm very careful", score: 0, description: "Waste warrior!", impact: "Minimal waste emissions" },
      { text: "Less than 10%", score: 2, description: "Low waste", impact: "Low waste impact" },
      { text: "About 10-20%", score: 5, description: "Some waste", impact: "Moderate waste impact" },
      { text: "More than 20%", score: 8, description: "High waste", impact: "High waste impact" },
    ],
    category: "Diet",
    subcategory: "Food Waste",
    info: "Globally, about one-third of all food produced is wasted, contributing 8-10% of total greenhouse gas emissions.",
    icon: "🗑️"
  },

  // WASTE MANAGEMENT QUESTIONS
  {
    question: "How would you describe your recycling habits?",
    answers: [
      { text: "Recycle everything possible", score: 1, description: "Recycling champion!", impact: "Minimal waste to landfill" },
      { text: "Recycle most things", score: 3, description: "Good recycler", impact: "Low waste to landfill" },
      { text: "Recycle some things", score: 6, description: "Partial recycler", impact: "Moderate waste to landfill" },
      { text: "Rarely or never recycle", score: 10, description: "High waste", impact: "High waste to landfill" },
    ],
    category: "Waste Management",
    subcategory: "Recycling",
    info: "Recycling reduces the need for new materials and the energy required to produce them. A single aluminum can saves enough energy to run a TV for 3 hours.",
    icon: "♻️"
  },
  {
    question: "Do you compost food scraps?",
    answers: [
      { text: "Yes, everything compostable", score: 0, description: "Compost master!", impact: "Zero organic waste" },
      { text: "Some composting", score: 3, description: "Partial composter", impact: "Reduced organic waste" },
      { text: "No, but I want to start", score: 5, description: "Interested beginner", impact: "Some organic waste" },
      { text: "No, and not interested", score: 8, description: "No composting", impact: "High organic waste" },
    ],
    category: "Waste Management",
    subcategory: "Composting",
    info: "Composting food scraps prevents methane emissions from landfills and creates valuable soil amendment.",
    icon: "🌿"
  },

  // HOME & POSSESSIONS QUESTIONS
  {
    question: "How large is your home?",
    answers: [
      { text: "Small apartment (<800 sq ft)", score: 2, description: "Compact living", impact: "Low energy needs" },
      { text: "Medium apartment (800-1200 sq ft)", score: 4, description: "Moderate size", impact: "Moderate energy needs" },
      { text: "Large apartment/small house (1200-2000 sq ft)", score: 6, description: "Spacious", impact: "Higher energy needs" },
      { text: "Large house (2000-3000 sq ft)", score: 8, description: "Very spacious", impact: "High energy needs" },
      { text: "Very large house (>3000 sq ft)", score: 12, description: "Estate-sized", impact: "Very high energy needs" },
    ],
    category: "Home & Possessions",
    subcategory: "Home Size",
    info: "Larger homes require more energy to heat, cool, and light. Smaller, efficient spaces have a much lower carbon footprint.",
    icon: "🏠"
  },
  {
    question: "How often do you buy new clothing?",
    answers: [
      { text: "Rarely - mostly secondhand", score: 1, description: "Sustainable shopper!", impact: "Minimal fashion footprint" },
      { text: "A few times a year", score: 3, description: "Occasional buyer", impact: "Low fashion impact" },
      { text: "Monthly", score: 6, description: "Regular shopper", impact: "Moderate fashion impact" },
      { text: "Multiple times a month", score: 10, description: "Frequent shopper", impact: "High fashion impact" },
    ],
    category: "Home & Possessions",
    subcategory: "Fashion",
    info: "The fashion industry produces 10% of global carbon emissions. Buying less and choosing sustainable brands reduces impact.",
    icon: "👕"
  },

  // DAILY HABITS QUESTIONS
  {
    question: "Do you use reusable bags, bottles, and containers?",
    answers: [
      { text: "Always - I'm prepared", score: 0, description: "Zero-waste hero!", impact: "Minimal plastic waste" },
      { text: "Most of the time", score: 3, description: "Good habits", impact: "Low plastic waste" },
      { text: "Sometimes", score: 6, description: "Inconsistent", impact: "Moderate plastic waste" },
      { text: "Rarely or never", score: 10, description: "Single-use heavy", impact: "High plastic waste" },
    ],
    category: "Daily Habits",
    subcategory: "Reusables",
    info: "Plastic production is carbon-intensive. Using reusables significantly reduces plastic waste and associated emissions.",
    icon: "🛍️"
  },
  {
    question: "How long are your showers?",
    answers: [
      { text: "Under 5 minutes", score: 1, description: "Quick and efficient", impact: "Minimal water/energy use" },
      { text: "5-10 minutes", score: 3, description: "Reasonable length", impact: "Moderate water/energy use" },
      { text: "10-15 minutes", score: 6, description: "Long showers", impact: "High water/energy use" },
      { text: "Over 15 minutes", score: 10, description: "Very long showers", impact: "Very high water/energy use" },
    ],
    category: "Daily Habits",
    subcategory: "Water Use",
    info: "Shorter showers save both water and the energy needed to heat it. A 5-minute shower uses about 10 gallons of water.",
    icon: "🚿"
  },
];
