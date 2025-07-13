import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { Product } from "@/types/cart";

export function ShopSection() {
  const { addToCart } = useCart();
  const [tshirtSize, setTshirtSize] = useState("M");
  const [tshirtColor, setTshirtColor] = useState("Biela");
  const [addedProduct, setAddedProduct] = useState<string | null>(null);

  const products: Product[] = [
    {
      id: "basic-game",
      name: "Základná hra Geometro",
      price: 34.99,
      description: "Kompletná sada obsahuje všetky potrebné geometrické telesá, herné karty a návod na hranie.",
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      inStock: true
    },
    {
      id: "expansion",
      name: "Rozšírenie \"Objemové výzvy\"",
      price: 19.99,
      description: "Pokročilé úlohy zamerané na počítanie objemov, povrchov a pokročilé geometrické koncepty.",
      image: "https://images.unsplash.com/photo-1632736774088-0e90e7a5a4ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      inStock: true
    },
    {
      id: "tshirt",
      name: "Geometro tričko",
      price: 16.99,
      description: "Štýlové tričko s geometrickým dizajnom. Dostupné v rôznych veľkostiach a farbách.",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
      inStock: true,
      hasSize: true,
      hasColor: true
    }
  ];

  const handleAddToCart = (product: Product) => {
    let name = product.name;
    let size = undefined;
    let color = undefined;

    if (product.id === "tshirt") {
      name = `${product.name} (${tshirtSize}, ${tshirtColor})`;
      size = tshirtSize;
      color = tshirtColor;
    }

    addToCart({
      id: product.id,
      name,
      price: product.price,
      size,
      color
    });

    setAddedProduct(product.id);
    setTimeout(() => setAddedProduct(null), 2000);
  };

  return (
    <section id="shop" className="py-20 bg-neutral-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">E-shop</h2>
          <p className="text-xl text-neutral-dark">Vyberte si produkty pre vašu matematickú zábavu</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="product-card bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-neutral-dark mb-4">{product.description}</p>
                
                {product.hasSize && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Veľkosť:</label>
                    <Select value={tshirtSize} onValueChange={setTshirtSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="XL">XL</SelectItem>
                        <SelectItem value="XXL">XXL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {product.hasColor && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Farba:</label>
                    <Select value={tshirtColor} onValueChange={setTshirtColor}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Biela">Biela</SelectItem>
                        <SelectItem value="Čierna">Čierna</SelectItem>
                        <SelectItem value="Modrá">Modrá</SelectItem>
                        <SelectItem value="Tyrkysová">Tyrkysová</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold text-primary">€{product.price.toFixed(2)}</span>
                  {product.inStock && (
                    <Badge variant="secondary" className="bg-green-100 text-green-600">
                      Na sklade
                    </Badge>
                  )}
                </div>
                
                <Button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full font-semibold transition-all duration-300 ${
                    addedProduct === product.id 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-primary hover:bg-blue-700'
                  }`}
                  disabled={!product.inStock}
                >
                  {addedProduct === product.id ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Pridané!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Pridať do košíka
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
