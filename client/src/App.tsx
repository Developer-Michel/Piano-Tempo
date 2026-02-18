import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/language-context";
import Home from "@/pages/Home";
import Policy from "@/pages/Policy";
import FAQ from "@/pages/FAQ";
import Gallery from "@/pages/Gallery";
import Resources from "@/pages/Resources";
import Methodology from "@/pages/Methodology";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    console.log("Location changed:", location);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/policy" component={Policy} />
      <Route path="/faq" component={FAQ} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/resources" component={Resources} />
      <Route path="/methodology" component={Methodology} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Router />
      </LanguageProvider>
    </TooltipProvider>
  );
}

export default App;
