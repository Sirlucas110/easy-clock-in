const tipos = [
  { value: "entrada", label: "Entrada" },
  { value: "saida", label: "Saída" },
  { value: "intervalo", label: "Intervalo" },
  { value: "retorno", label: "Retorno" },
] as const;

interface TipoSelectorProps {
  value: string;
  onChange: (tipo: string) => void;
}

const TipoSelector = ({ value, onChange }: TipoSelectorProps) => {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {tipos.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={`text-xs py-1.5 px-2 rounded-md font-medium transition-colors ${
            value === t.value
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-border"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default TipoSelector;
