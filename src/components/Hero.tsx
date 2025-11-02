import { Button } from "@/components/ui/button";
import { Leaf, Coins, Users } from "lucide-react";
import heroImage from "@/assets/hero-community.jpg";

export const Hero = ({ onStartGame }: { onStartGame: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Leaf className="h-4 w-4" />
            Financiamento Climático para o Sudeste
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            Transforme sua{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Comunidade Sustentável
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Aprenda sobre financiamento climático através de um jogo interativo. 
            Tome decisões estratégicas e veja o impacto de investimentos sustentáveis na sua comunidade.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
            <Button 
              variant="hero" 
              size="lg"
              onClick={onStartGame}
              className="text-base"
            >
              Começar o Jogo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-base bg-card/80 backdrop-blur-sm"
            >
              Saiba Mais
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-soft">
              <Leaf className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-primary">100%</h3>
              <p className="text-sm text-muted-foreground">Sustentável</p>
            </div>
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-soft">
              <Coins className="h-8 w-8 text-secondary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-primary">R$ 50M+</h3>
              <p className="text-sm text-muted-foreground">Em Financiamento</p>
            </div>
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-soft">
              <Users className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-primary">500+</h3>
              <p className="text-sm text-muted-foreground">Comunidades</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
