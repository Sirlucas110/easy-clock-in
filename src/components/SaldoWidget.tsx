import { useState, useEffect } from "react";
import SaldoService from "@/services/saldoService";
import { SaldoResponse } from "@/types/saldo";
import { Clock } from "lucide-react";

interface SaldoWidgetProps {
  refreshKey?: number;
}

function getMesAnoAtual(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function getMesReferenciaLabel(): string {
  const now = new Date();
  return now.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}

const SaldoWidget = ({ refreshKey }: SaldoWidgetProps) => {
  const [saldo, setSaldo] = useState<SaldoResponse | null>(null);
  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setErro(false);
    SaldoService.getSaldo(getMesAnoAtual())
      .then(setSaldo)
      .catch(() => setErro(true))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const isPositivo = saldo ? saldo.saldoMinutos >= 0 : false;
  const mesLabel = getMesReferenciaLabel();

  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Saldo do mês
            </p>
            <p className="text-xs text-muted-foreground capitalize">{mesLabel}</p>
          </div>
        </div>

        <div className="text-right">
          {loading ? (
            <div className="h-6 w-16 animate-pulse rounded bg-muted" />
          ) : erro ? (
            <span className="text-xs text-muted-foreground">Saldo indisponível</span>
          ) : saldo ? (
            <span
              className={`text-lg font-bold tabular-nums ${
                isPositivo ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {isPositivo ? "+" : ""}
              {saldo.saldoFormatado}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SaldoWidget;
