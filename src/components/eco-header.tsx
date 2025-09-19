import { Link } from "react-router-dom";

export default function EcoHeader() {
  return (
    <header className="sticky top-0 z-50 w-full glass-header">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link to="/" className="mr-6 flex items-center space-x-3">
          <img 
            src="/assets/images/logo.jpg" 
            alt="Footprint Calculator Logo" 
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="font-bold text-2xl inline-block font-headline">
            Footprint Calculator
          </span>
        </Link>
      </div>
    </header>
  );
}
