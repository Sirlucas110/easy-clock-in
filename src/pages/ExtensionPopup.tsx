import { useState, useEffect, useCallback } from "react";
import BaterPontoButton from "@/components/BaterPontoButton";
import BatidasList from "@/components/BatidasList";
import TipoSelector from "@/components/TipoSelector";
import Toast from "@/components/Toast";
import { getBatidas, postBatida, Batida } from "@/services/api";

const ExtensionPopup = () => {
  const [batidas, setBatidas] = useState<Batida[]>([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [tipo, setTipo] = useState("entrada");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchBatidas = useCallback(async () => {
    try {
      const data = await getBatidas();
      setBatidas(data);
    } catch {
      // silently fail
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBatidas();
  }, [fetchBatidas]);

  const handleBaterPonto = async () => {
    setLoading(true);
    try {
      await postBatida({
        timestamp: new Date().toISOString(),
        tipo: tipo as Batida["tipo"],
      });
      setToast({ message: "✅ Ponto registrado com sucesso!", type: "success" });
      await fetchBatidas();
    } catch {
      setToast({ message: "❌ Erro ao registrar ponto", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Header */}
      <div className="bg-primary px-5 py-4 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zM18 11c0 1.657-1.343 3-3 3M6 21v-1a4 4 0 014-4h4a4 4 0 014 4v1M12 3v4" />
        </svg>
        <div>
          <h1 className="text-lg font-bold text-primary-foreground">Ponto Eletrônico</h1>
          <p className="text-xs text-primary-foreground/70">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <TipoSelector value={tipo} onChange={setTipo} />
        <BaterPontoButton onClick={handleBaterPonto} loading={loading} tipo={tipo} />

        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Batidas de hoje
          </h2>
          <BatidasList batidas={batidas} loading={listLoading} />
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground py-3">
        Extensão Chrome — Ponto Eletrônico v1.0
      </p>
    </div>
  );
};

export default ExtensionPopup;
