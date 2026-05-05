import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import BudgetBrainLogo from "./BudgetBrainLogo";

const Navbar = ({ onConnect }: { onConnect: () => void }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/">
          <BudgetBrainLogo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#how" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="#security" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Security
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Login
          </Button>
          <Button size="sm" onClick={onConnect} className="bg-gradient-hero shadow-elegant hover:opacity-90">
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;