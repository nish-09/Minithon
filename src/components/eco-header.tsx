import { Sprout } from "lucide-react";
import { Link } from "react-router-dom";

export default function EcoHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <Sprout className="h-7 w-7 text-primary" />
          <span className="font-bold text-lg inline-block font-headline">
            Footprint Calculator
          </span>
        </Link>
      </div>
    </header>
  );
}
