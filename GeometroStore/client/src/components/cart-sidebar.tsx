import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const { cart, removeFromCart, getTotalPrice } = useCart();

  const handleCheckout = () => {
    onClose();
    onCheckout();
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 overflow-y-auto ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">Košík</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Váš košík je prázdny</p>
          </div>
        ) : (
          cart.map((item, index) => (
            <Card key={index} className="cart-item bg-gray-50">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    {item.size && (
                      <p className="text-sm text-gray-600">Veľkosť: {item.size}</p>
                    )}
                    {item.color && (
                      <p className="text-sm text-gray-600">Farba: {item.color}</p>
                    )}
                    <p className="text-sm text-gray-600">Množstvo: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">€{(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-red-700 mt-1"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Odstrániť
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {cart.length > 0 && (
        <div className="border-t p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-gray-900">Celkom:</span>
            <span className="text-2xl font-bold text-primary">€{getTotalPrice().toFixed(2)}</span>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full bg-primary text-white hover:bg-blue-700"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Pokračovať k objednávke
          </Button>
        </div>
      )}
    </div>
  );
}
