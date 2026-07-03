import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";
import Home from "./pages/Home";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import { Toaster } from "sonner";

export default function App() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
      <Navigation />
      
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/certifications" component={Certifications} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </main>

      <Footer />
      <FloatingWhatsAppButton />
      <Toaster position="top-right" richColors />
    </div>
  );
}
