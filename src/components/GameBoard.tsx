import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Coins, 
  TrendingUp, 
  Users, 
  Zap, 
  Droplets,
  Recycle,
  TreePine,
  Home
} from "lucide-react";
import { toast } from "sonner";

interface GameState {
  budget: number;
  sustainability: number;
  communitySupport: number;
  round: number;
}

interface Decision {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  cost: number;
  effects: {
    sustainability: number;
    communitySupport: number;
  };
  category: string;
}

const decisions: Decision[] = [
  {
    id: "solar",
    title: "Painéis Solares Comunitários",
    description: "Instalar painéis solares em edifícios públicos para reduzir custos de energia.",
    icon: <Zap className="h-6 w-6" />,
    cost: 15000,
    effects: { sustainability: 20, communitySupport: 15 },
    category: "Energia"
  },
  {
    id: "water",
    title: "Sistema de Captação de Água",
    description: "Implementar sistema de coleta e reutilização de água da chuva.",
    icon: <Droplets className="h-6 w-6" />,
    cost: 10000,
    effects: { sustainability: 15, communitySupport: 10 },
    category: "Água"
  },
  {
    id: "recycle",
    title: "Centro de Reciclagem",
    description: "Construir um centro de reciclagem e compostagem comunitária.",
    icon: <Recycle className="h-6 w-6" />,
    cost: 12000,
    effects: { sustainability: 18, communitySupport: 20 },
    category: "Resíduos"
  },
  {
    id: "forest",
    title: "Reflorestamento Urbano",
    description: "Plantar árvores nativas em áreas públicas e criar corredores verdes.",
    icon: <TreePine className="h-6 w-6" />,
    cost: 8000,
    effects: { sustainability: 25, communitySupport: 18 },
    category: "Biodiversidade"
  },
  {
    id: "housing",
    title: "Moradias Sustentáveis",
    description: "Construir habitações ecológicas com materiais sustentáveis.",
    icon: <Home className="h-6 w-6" />,
    cost: 20000,
    effects: { sustainability: 22, communitySupport: 25 },
    category: "Habitação"
  },
  {
    id: "education",
    title: "Programa Educacional",
    description: "Criar workshops sobre sustentabilidade e financiamento verde.",
    icon: <Users className="h-6 w-6" />,
    cost: 5000,
    effects: { sustainability: 10, communitySupport: 30 },
    category: "Educação"
  }
];

export const GameBoard = ({ onBack }: { onBack: () => void }) => {
  const [gameState, setGameState] = useState<GameState>({
    budget: 50000,
    sustainability: 0,
    communitySupport: 0,
    round: 1,
  });

  const [gameOver, setGameOver] = useState(false);
  const [selectedDecisions, setSelectedDecisions] = useState<string[]>([]);

  const handleDecision = (decision: Decision) => {
    if (gameState.budget < decision.cost) {
      toast.error("Orçamento insuficiente!", {
        description: `Você precisa de R$ ${decision.cost.toLocaleString('pt-BR')}, mas tem apenas R$ ${gameState.budget.toLocaleString('pt-BR')}.`
      });
      return;
    }

    const newState = {
      budget: gameState.budget - decision.cost,
      sustainability: Math.min(100, gameState.sustainability + decision.effects.sustainability),
      communitySupport: Math.min(100, gameState.communitySupport + decision.effects.communitySupport),
      round: gameState.round + 1,
    };

    setGameState(newState);
    setSelectedDecisions([...selectedDecisions, decision.id]);

    toast.success(`${decision.title} implementado!`, {
      description: `Sustentabilidade +${decision.effects.sustainability}% | Apoio Comunitário +${decision.effects.communitySupport}%`
    });

    // Check for game over
    if (newState.round > 5 || newState.budget < 5000) {
      setGameOver(true);
      calculateFinalScore(newState);
    }
  };

  const calculateFinalScore = (state: GameState) => {
    const totalScore = state.sustainability + state.communitySupport;
    let message = "";

    if (totalScore >= 150) {
      message = "🌟 Excelente! Sua comunidade é modelo de sustentabilidade!";
    } else if (totalScore >= 100) {
      message = "✅ Bom trabalho! A comunidade está no caminho certo.";
    } else if (totalScore >= 50) {
      message = "📊 Progresso moderado. Continue investindo em sustentabilidade.";
    } else {
      message = "💡 Ainda há muito a fazer. Revise suas estratégias de investimento.";
    }

    toast.success("Jogo Concluído!", {
      description: message,
      duration: 10000,
    });
  };

  const resetGame = () => {
    setGameState({
      budget: 50000,
      sustainability: 0,
      communitySupport: 0,
      round: 1,
    });
    setGameOver(false);
    setSelectedDecisions([]);
    toast.info("Novo jogo iniciado!");
  };

  const availableDecisions = decisions.filter(d => !selectedDecisions.includes(d.id));

  return (
    <section className="min-h-screen py-20 bg-gradient-nature">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Gestão Comunitária Sustentável
              </h2>
              <p className="text-muted-foreground">
                Rodada {gameState.round} de 5 | Tome decisões estratégicas para sua comunidade
              </p>
            </div>
            <Button variant="outline" onClick={onBack}>
              Voltar ao Início
            </Button>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-secondary" />
                  <CardTitle className="text-lg">Orçamento</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  R$ {gameState.budget.toLocaleString('pt-BR')}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Sustentabilidade</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-bold text-primary">{gameState.sustainability}%</p>
                <Progress value={gameState.sustainability} className="h-2" />
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <CardTitle className="text-lg">Apoio Comunitário</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-bold text-primary">{gameState.communitySupport}%</p>
                <Progress value={gameState.communitySupport} className="h-2" />
              </CardContent>
            </Card>
          </div>

          {/* Game Over or Decisions */}
          {gameOver ? (
            <Card className="shadow-glow border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-2xl">Jogo Concluído!</CardTitle>
                <CardDescription>Veja os resultados da sua gestão</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Sustentabilidade Final</p>
                    <p className="text-3xl font-bold text-primary">{gameState.sustainability}%</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Apoio Comunitário</p>
                    <p className="text-3xl font-bold text-accent">{gameState.communitySupport}%</p>
                  </div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Pontuação Total</p>
                  <p className="text-4xl font-bold text-primary">
                    {gameState.sustainability + gameState.communitySupport} pontos
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button variant="hero" className="flex-1" onClick={resetGame}>
                  Jogar Novamente
                </Button>
                <Button variant="outline" className="flex-1" onClick={onBack}>
                  Voltar ao Início
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <>
              <div>
                <h3 className="text-2xl font-bold mb-4">Escolha seu Próximo Investimento</h3>
                <p className="text-muted-foreground mb-6">
                  Selecione projetos que equilibrem sustentabilidade e apoio da comunidade
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableDecisions.map((decision) => (
                  <Card 
                    key={decision.id} 
                    className="shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                          {decision.icon}
                        </div>
                        <Badge variant="secondary">{decision.category}</Badge>
                      </div>
                      <CardTitle className="text-xl">{decision.title}</CardTitle>
                      <CardDescription>{decision.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Custo:</span>
                        <span className="font-bold text-primary">
                          R$ {decision.cost.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Sustentabilidade:</span>
                          <span className="text-primary font-medium">
                            +{decision.effects.sustainability}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Apoio:</span>
                          <span className="text-accent font-medium">
                            +{decision.effects.communitySupport}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="hero"
                        className="w-full"
                        onClick={() => handleDecision(decision)}
                        disabled={gameState.budget < decision.cost}
                      >
                        {gameState.budget < decision.cost ? "Orçamento Insuficiente" : "Investir"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
