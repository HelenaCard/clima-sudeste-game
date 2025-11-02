import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Sparkles, Globe, Building2, Landmark, Heart } from "lucide-react";
import sustainabilityIcon from "@/assets/sustainability-icon.png";

export const About = () => {
  const fundingTypes = [
    {
      icon: <Landmark className="h-10 w-10" />,
      title: "Recursos Públicos",
      description: "Financiamento proveniente de governos municipais, estaduais e federais. Incluem subsídios, créditos facilitados e programas de incentivo governamental para projetos sustentáveis.",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: <Building2 className="h-10 w-10" />,
      title: "Recursos Privados",
      description: "Investimentos de empresas e instituições financeiras privadas. Podem incluir empréstimos bancários, investimentos de impacto e parcerias público-privadas voltadas para sustentabilidade.",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: "Recursos Filantrópicos",
      description: "Doações e financiamentos de organizações sem fins lucrativos, fundações e ONGs internacionais. Focam em projetos de impacto social e ambiental para comunidades vulneráveis.",
      color: "text-pink-600 dark:text-pink-400"
    }
  ];

  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Aprenda Jogando",
      description: "Entenda como funciona o financiamento climático através de decisões práticas e interativas."
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Impacto Real",
      description: "Veja como cada investimento afeta a sustentabilidade e o apoio da comunidade em tempo real."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Foco Regional",
      description: "Projetos adaptados para as necessidades específicas do Sudeste brasileiro."
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Recursos Educativos",
      description: "Acesso a informações e guias sobre financiamento climático e sustentabilidade."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <img 
                src={sustainabilityIcon} 
                alt="Sustentabilidade" 
                className="h-24 w-24 animate-in zoom-in duration-500"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Sobre o Projeto
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma educativa que democratiza o conhecimento sobre financiamento 
              climático e capacita comunidades do Sudeste brasileiro a tomar decisões sustentáveis.
            </p>
          </div>

          {/* Tipos de Recursos */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold">
                Tipos de Financiamento Climático
              </h3>
              <p className="text-muted-foreground">
                Entenda as diferentes fontes de recursos disponíveis para projetos sustentáveis
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fundingTypes.map((type, index) => (
                <Card 
                  key={index} 
                  className="shadow-soft hover:shadow-glow transition-all duration-300 border-2"
                >
                  <CardHeader className="text-center">
                    <div className={`p-4 rounded-full w-fit mx-auto mb-4 bg-gradient-to-br from-primary/10 to-primary/5 ${type.color}`}>
                      {type.icon}
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                    <CardDescription className="text-base text-left pt-2">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="shadow-soft hover:shadow-glow transition-all duration-300"
              >
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-3">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <Card className="bg-gradient-hero text-primary-foreground shadow-glow border-0">
            <CardContent className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold">
                  Por Que Financiamento Climático?
                </h3>
                <p className="text-lg opacity-90">
                  O financiamento climático é essencial para implementar projetos de sustentabilidade 
                  em comunidades. Através deste jogo, você aprende a identificar oportunidades, 
                  avaliar impactos e tomar decisões estratégicas que beneficiam tanto o meio ambiente 
                  quanto as pessoas.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-4 text-sm font-medium">
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    ✓ Energia Renovável
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    ✓ Gestão de Recursos
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    ✓ Habitação Sustentável
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    ✓ Educação Ambiental
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
