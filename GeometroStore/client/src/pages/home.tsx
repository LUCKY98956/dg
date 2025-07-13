import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ShopSection } from "@/components/shop-section";
import { CartSidebar } from "@/components/cart-sidebar";
import { OrderModal } from "@/components/order-modal";
import { Footer } from "@/components/footer";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-light">
      <Navigation onCartToggle={() => setIsCartOpen(true)} />
      <HeroSection />
      <AboutSection />
      <ShopSection />
      <Footer />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => setIsOrderModalOpen(true)}
      />
      
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)}
      />
    </div>
  );
}
