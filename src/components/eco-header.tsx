import { Link } from "react-router-dom";
import { Home, BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EcoHeader() {
  return (
    <header className="sticky top-0 z-50 w-full glass-header text-white">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link to="/" className="mr-6 flex items-center space-x-3">
          <img 
            src="/assets/images/logo.jpg" 
            alt="Footprint Calculator Logo" 
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="font-bold text-2xl inline-block font-headline text-white">
            EcoFy
          </span>
        </Link>
        {/* Hamburger Menu */}
        <div className="relative group">
          <Button
            variant="ghost"
            size="icon"
            className="h-16 w-16 hover:bg-primary/10 transition-colors text-white"
          >
            <Menu className="h-14 w-14 group-hover:hidden" />
            <X className="h-14 w-14 hidden group-hover:block" />
          </Button>
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="py-2">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </Link>
              
              <Link
                to="/quiz"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                <span className="font-medium">Take Quiz</span>
              </Link>
              
              <Link
                to="/#carbon-footprint"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                <span className="font-medium">Learn About Carbon Footprint</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
