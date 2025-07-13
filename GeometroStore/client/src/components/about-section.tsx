import { Users, Box, Brain, GraduationCap } from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: Users,
      title: "Pre 2-4 hráčov",
      description: "Ideálna pre rodinnú zábavu alebo školské aktivity. Každý hráč môže rozvíjať svoje priestorové myslenie.",
      color: "bg-primary"
    },
    {
      icon: Box,
      title: "3D Geometrické telesá",
      description: "Pracujte s kockami, guľami, kužeľmi, ihlánmi a ďalšími telesami. Každé teleso má svoje unikátne vlastnosti.",
      color: "bg-secondary"
    },
    {
      icon: Brain,
      title: "Logické výzvy",
      description: "Riešte úlohy na skladanie, počítanie objemov, hľadanie podobností a mnoho ďalších geometrických puzzle.",
      color: "bg-accent"
    },
    {
      icon: GraduationCap,
      title: "Vzdelávacia hodnota",
      description: "Podporuje rozvoj matematického myslenia, priestorovej predstavivosti a logického uvažovania.",
      color: "bg-green-500"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">O hre Geometro</h2>
          <p className="text-xl text-neutral-dark">Ako funguje táto fascinujúca matematická hra</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Children learning with geometric shapes and mathematical games"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`${feature.color} p-3 rounded-full`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-neutral-dark">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
