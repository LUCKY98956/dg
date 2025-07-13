import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";

interface NavigationProps {
  onCartToggle: () => void;
}

export function Navigation({ onCartToggle }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center animate-spin-slow">
              <div className="w-6 h-6 bg-white rounded transform rotate-45"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Geometro</h1>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Domov
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              O hre
            </button>
            <button 
              onClick={() => scrollToSection("shop")}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              E-shop
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Kontakt
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={onCartToggle}
              className="relative bg-primary text-white hover:bg-blue-700"
            >
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="flex flex-col space-y-2 pt-4">
              <button 
                onClick={() => scrollToSection("home")}
                className="text-left text-gray-700 hover:text-primary transition-colors py-2"
              >
                Domov
              </button>
              <button 
                onClick={() => scrollToSection("about")}
                className="text-left text-gray-700 hover:text-primary transition-colors py-2"
              >
                O hre
              </button>
              <button 
                onClick={() => scrollToSection("shop")}
                className="text-left text-gray-700 hover:text-primary transition-colors py-2"
              >
                E-shop
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="text-left text-gray-700 hover:text-primary transition-colors py-2"
              >
                Kontakt
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
