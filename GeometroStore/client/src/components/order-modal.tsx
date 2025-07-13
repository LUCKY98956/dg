import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Check } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
  });

  const orderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: () => {
      clearCart();
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        customerAddress: "",
      });
      onClose();
      toast({
        title: "Objednávka úspešná!",
        description: "Vaša objednávka bola úspešne odoslaná.",
      });
    },
    onError: () => {
      toast({
        title: "Chyba",
        description: "Nastala chyba pri spracovaní objednávky.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerEmail || !formData.customerAddress) {
      toast({
        title: "Chyba",
        description: "Vyplňte prosím všetky povinné polia.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      ...formData,
      items: JSON.stringify(cart),
      total: Math.round(getTotalPrice() * 100), // Convert to cents
    };

    orderMutation.mutate(orderData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full mx-4 max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Objednávka</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="customerName">Meno a priezvisko *</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => handleInputChange("customerName", e.target.value)}
              required
              className="focus:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customerEmail">Email *</Label>
            <Input
              id="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={(e) => handleInputChange("customerEmail", e.target.value)}
              required
              className="focus:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customerPhone">Telefón</Label>
            <Input
              id="customerPhone"
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => handleInputChange("customerPhone", e.target.value)}
              className="focus:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customerAddress">Adresa *</Label>
            <Textarea
              id="customerAddress"
              value={formData.customerAddress}
              onChange={(e) => handleInputChange("customerAddress", e.target.value)}
              required
              rows={3}
              className="focus:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Produkty v objednávke</Label>
            <Card>
              <CardContent className="p-4 space-y-2">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-gray-600 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-bold">€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between items-center text-xl font-bold border-t pt-4">
            <span>Celková cena:</span>
            <span className="text-primary">€{getTotalPrice().toFixed(2)}</span>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary text-white hover:bg-blue-700"
            disabled={orderMutation.isPending}
          >
            {orderMutation.isPending ? (
              "Spracovávam..."
            ) : (
              <>
                <Check className="w-5 h-5 mr-2" />
                Objednať
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
