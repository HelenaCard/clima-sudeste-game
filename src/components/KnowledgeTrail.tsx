import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface KnowledgeTrailProps {
  currentRound: number;
  selectedDecisions: string[];
}

const milestones = [
  { round: 1, title: "Início da Jornada", description: "Primeiros passos" },
  { round: 2, title: "Aprendiz Sustentável", description: "Explorando opções" },
  { round: 3, title: "Agente de Mudança", description: "Impacto crescente" },
  { round: 4, title: "Líder Comunitário", description: "Transformação real" },
  { round: 5, title: "Guardião do Futuro", description: "Legado sustentável" }
];

export const KnowledgeTrail = ({ currentRound, selectedDecisions }: KnowledgeTrailProps) => {
  return (
    <Card className="shadow-soft bg-gradient-nature">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Trilha do Conhecimento</h3>
            <Badge variant="secondary" className="font-semibold">
              Fase {currentRound} de 5
            </Badge>
          </div>

          {/* Trail Path */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-6 left-6 h-[calc(100%-3rem)] w-0.5 bg-border" />
            
            {/* Milestones */}
            <div className="space-y-6 relative">
              {milestones.map((milestone, index) => {
                const isCompleted = currentRound > milestone.round;
                const isCurrent = currentRound === milestone.round;
                const isPending = currentRound < milestone.round;

                return (
                  <div
                    key={milestone.round}
                    className={cn(
                      "flex items-start gap-4 relative transition-all duration-300",
                      isCurrent && "scale-105"
                    )}
                  >
                    {/* Milestone Icon */}
                    <div className="relative z-10">
                      {isCurrent ? (
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
                          <div className="relative bg-primary text-primary-foreground p-2 rounded-full shadow-glow">
                            <User className="h-5 w-5" />
                          </div>
                        </div>
                      ) : isCompleted ? (
                        <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-soft">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                      ) : (
                        <div className="bg-muted text-muted-foreground p-2 rounded-full">
                          <Circle className="h-5 w-5" />
                        </div>
                      )}
                    </div>

                    {/* Milestone Content */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={cn(
                          "p-3 rounded-lg transition-all duration-300",
                          isCurrent && "bg-primary/10 border-2 border-primary",
                          isCompleted && "bg-muted/50",
                          isPending && "opacity-50"
                        )}
                      >
                        <h4
                          className={cn(
                            "font-semibold text-sm",
                            isCurrent && "text-primary"
                          )}
                        >
                          {milestone.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {milestone.description}
                        </p>
                        {isCompleted && (
                          <Badge variant="outline" className="mt-2 text-xs">
                            ✓ Completo
                          </Badge>
                        )}
                        {isCurrent && (
                          <Badge variant="default" className="mt-2 text-xs">
                            🎯 Em Progresso
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Summary */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Projetos Implementados:</span>
              <span className="font-bold text-primary">{selectedDecisions.length}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
