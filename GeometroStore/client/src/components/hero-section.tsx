import { Button } from "@/components/ui/button";
import { ShoppingCart, Info } from "lucide-react";
import { GeometricBackground } from "./geometric-background";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="geometric-bg py-20 relative">
      <GeometricBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Geometro
              <span className="block text-primary">Matematická Hra</span>
            </h1>
            <p className="text-xl text-neutral-dark mb-8 leading-relaxed">
              Objavte fascinujúci svet 3D geometrie! Logická stolová hra pre 2-4 hráčov, 
              kde skladáte telesá a riešite geometrické výzvy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection("shop")}
                className="bg-primary text-white hover:bg-blue-700"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Kúpiť teraz
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("about")}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Info className="w-5 h-5 mr-2" />
                Viac info
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800"
              alt="Geometro mathematical board game with 3D geometric shapes"
              className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary rounded-full opacity-20 animate-pulse-slow"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent rounded-lg opacity-20 animate-spin-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
