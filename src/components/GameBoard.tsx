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
  Home,
  Info
} from "lucide-react";
import { toast } from "sonner";
import { KnowledgeTrail } from "./KnowledgeTrail";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  impact: {
    cause: string;
    consequence: string;
    environmentalBenefit: string;
  };
}

const decisions: Decision[] = [
  {
    id: "solar",
    title: "Painéis Solares Comunitários",
    description: "Instalar painéis solares em edifícios públicos para reduzir custos de energia.",
    icon: <Zap className="h-6 w-6" />,
    cost: 15000,
    effects: { sustainability: 20, communitySupport: 15 },
    category: "Energia",
    impact: {
      cause: "Instalação de 50 painéis fotovoltaicos em escolas e centros comunitários",
      consequence: "Redução de 40% no consumo de energia da rede elétrica convencional",
      environmentalBenefit: "Evita emissão de 15 toneladas de CO₂ por ano e economiza R$ 3.000/mês em energia"
    }
  },
  {
    id: "water",
    title: "Sistema de Captação de Água",
    description: "Implementar sistema de coleta e reutilização de água da chuva.",
    icon: <Droplets className="h-6 w-6" />,
    cost: 10000,
    effects: { sustainability: 15, communitySupport: 10 },
    category: "Água",
    impact: {
      cause: "Construção de cisternas e sistemas de filtragem em 30 residências",
      consequence: "Captação de 50.000 litros de água por mês durante período chuvoso",
      environmentalBenefit: "Reduz pressão sobre aquíferos e diminui 30% do consumo de água tratada"
    }
  },
  {
    id: "recycle",
    title: "Centro de Reciclagem",
    description: "Construir um centro de reciclagem e compostagem comunitária.",
    icon: <Recycle className="h-6 w-6" />,
    cost: 12000,
    effects: { sustainability: 18, communitySupport: 20 },
    category: "Resíduos",
    impact: {
      cause: "Criação de centro com triagem de resíduos e compostagem orgânica",
      consequence: "Processamento de 8 toneladas de resíduos por mês e geração de empregos locais",
      environmentalBenefit: "Desvia 60% dos resíduos de aterros e produz 2 toneladas de adubo orgânico/mês"
    }
  },
  {
    id: "forest",
    title: "Reflorestamento Urbano",
    description: "Plantar árvores nativas em áreas públicas e criar corredores verdes.",
    icon: <TreePine className="h-6 w-6" />,
    cost: 8000,
    effects: { sustainability: 25, communitySupport: 18 },
    category: "Biodiversidade",
    impact: {
      cause: "Plantio de 500 mudas de espécies nativas da Mata Atlântica",
      consequence: "Criação de corredores ecológicos e aumento de áreas verdes em 3 hectares",
      environmentalBenefit: "Absorve 25 toneladas de CO₂/ano, reduz temperatura local em 2°C e atrai fauna nativa"
    }
  },
  {
    id: "housing",
    title: "Moradias Sustentáveis",
    description: "Construir habitações ecológicas com materiais sustentáveis.",
    icon: <Home className="h-6 w-6" />,
    cost: 20000,
    effects: { sustainability: 22, communitySupport: 25 },
    category: "Habitação",
    impact: {
      cause: "Construção de 10 casas com bambu, adobe e sistemas de energia solar integrados",
      consequence: "Famílias têm moradias com custo operacional 50% menor e conforto térmico superior",
      environmentalBenefit: "Usa 70% menos materiais convencionais e gera zero resíduos de construção"
    }
  },
  {
    id: "education",
    title: "Programa Educacional",
    description: "Criar workshops sobre sustentabilidade e financiamento verde.",
    icon: <Users className="h-6 w-6" />,
    cost: 5000,
    effects: { sustainability: 10, communitySupport: 30 },
    category: "Educação",
    impact: {
      cause: "Realização de 20 workshops com 300 participantes sobre práticas sustentáveis",
      consequence: "Comunidade capacitada para acessar fundos verdes e implementar projetos próprios",
      environmentalBenefit: "Multiplica conhecimento: cada participante treina 5 pessoas, criando rede de 1.500 agentes de mudança"
    }
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

    // Detailed impact toast
    toast.success(`✅ ${decision.title} implementado!`, {
      description: (
        <div className="space-y-2 mt-2">
          <p className="font-semibold">🎯 Ação: {decision.impact.cause}</p>
          <p className="text-sm">📊 Resultado: {decision.impact.consequence}</p>
          <p className="text-sm text-primary">🌱 Impacto Ambiental: {decision.impact.environmentalBenefit}</p>
        </div>
      ),
      duration: 8000,
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
        <div className="max-w-7xl mx-auto space-y-8">
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

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Stats and Trail */}
            <div className="lg:col-span-1 space-y-6">
              {/* Stats Dashboard */}
              <div className="space-y-4">
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

              {/* Knowledge Trail */}
              <KnowledgeTrail 
                currentRound={gameState.round}
                selectedDecisions={selectedDecisions}
              />
            </div>

            {/* Right Column - Game Content */}
            <div className="lg:col-span-2 space-y-6">

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
                      Selecione projetos que equilibrem sustentabilidade e apoio da comunidade. Clique no ícone ℹ️ para ver detalhes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Info className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2 text-2xl">
                                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        {decision.icon}
                                      </div>
                                      {decision.title}
                                    </DialogTitle>
                                    <DialogDescription className="text-base pt-2">
                                      {decision.description}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 pt-4">
                                    <div className="p-4 bg-muted rounded-lg space-y-3">
                                      <div>
                                        <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                                          🎯 Causa - O que será feito:
                                        </h4>
                                        <p className="text-sm">{decision.impact.cause}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                                          📊 Consequência - Resultado direto:
                                        </h4>
                                        <p className="text-sm">{decision.impact.consequence}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                                          🌱 Impacto Ambiental - Benefício real:
                                        </h4>
                                        <p className="text-sm">{decision.impact.environmentalBenefit}</p>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                      <div className="text-center p-3 bg-secondary/10 rounded-lg">
                                        <p className="text-xs text-muted-foreground mb-1">Investimento</p>
                                        <p className="font-bold text-primary">R$ {decision.cost.toLocaleString('pt-BR')}</p>
                                      </div>
                                      <div className="text-center p-3 bg-primary/10 rounded-lg">
                                        <p className="text-xs text-muted-foreground mb-1">Sustentabilidade</p>
                                        <p className="font-bold text-primary">+{decision.effects.sustainability}%</p>
                                      </div>
                                      <div className="text-center p-3 bg-accent/10 rounded-lg">
                                        <p className="text-xs text-muted-foreground mb-1">Apoio</p>
                                        <p className="font-bold text-accent">+{decision.effects.communitySupport}%</p>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Badge variant="secondary">{decision.category}</Badge>
                            </div>
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
        </div>
      </div>
    </section>
  );
};
