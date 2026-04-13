import { BatidaResponse } from "@/types/batida";
import { Clock, LogIn, LogOut, Coffee, RotateCcw } from "lucide-react";

interface BatidasListProps {
  batidas: BatidaResponse[];
  loading: boolean;
}

const tipoConfig: Record<string, { label: string; icon: typeof Clock; colorClass: string }> = {
  entrada: { label: "Entrada", icon: LogIn, colorClass: "text-success" },
  saida: { label: "Saída", icon: LogOut, colorClass: "text-destructive" },
  intervalo: { label: "Intervalo", icon: Coffee, colorClass: "text-warning" },
  retorno: { label: "Retorno", icon: RotateCcw, colorClass: "text-primary" },
};

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const BatidasList = ({ batidas, loading }: BatidasListProps) => {
  if (loading) {
    return (
      <div className="flex flex-col gap-2 py-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (batidas.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 text-muted-foreground">
        <Clock className="h-10 w-10 mb-2 opacity-40" />
        <p className="text-sm">Nenhuma batida registrada hoje</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {batidas.map((batida, index) => {
        const config = tipoConfig[batida.tipo] || tipoConfig.entrada;
        const Icon = config.icon;
        return (
          <div
            key={batida.id || index}
            className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Icon className={`h-4 w-4 ${config.colorClass}`} />
              <span className="text-sm font-medium text-foreground">{config.label}</span>
            </div>
            <span className="text-sm font-mono text-muted-foreground">
              {formatTime(batida.timestamp)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BatidasList;
