import { Loader2, Clock } from "lucide-react";

interface BaterPontoButtonProps {
  onClick: () => void;
  loading: boolean;
  tipo: string;
}

const tipoLabels: Record<string, string> = {
  ENTRADA: "Entrada",
  SAIDA: "Saída",
  INTERVALO: "Intervalo",
  RETORNO: "Retorno",
};

const BaterPontoButton = ({ onClick, loading, tipo }: BaterPontoButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3.5 px-6 rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-base"
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Clock className="h-5 w-5" />
      )}
      {loading ? "Registrando..." : `Bater Ponto — ${tipoLabels[tipo] || tipo}`}
    </button>
  );
};

export default BaterPontoButton;
