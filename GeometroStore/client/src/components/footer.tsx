import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded transform rotate-45"></div>
              </div>
              <h3 className="text-xl font-bold">Geometro</h3>
            </div>
            <p className="text-gray-400">
              Matematická stolová hra, ktorá rozvíja priestorové myslenie a logiku.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                info@geometro.sk
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +421 900 123 456
              </p>
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Bratislava, Slovensko
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Sledujte nás</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Geometro. Všetky práva vyhradené.</p>
        </div>
      </div>
    </footer>
  );
}
