import { useState, useEffect, useCallback } from "react";
import BaterPontoButton from "@/components/BaterPontoButton";
import BatidasList from "@/components/BatidasList";
import TipoSelector from "@/components/TipoSelector";
import SaldoWidget from "@/components/SaldoWidget";
import Toast from "@/components/Toast";
import DownloadExtension from "@/components/DownloadExtension";
import { getBatidas, postBatida, Batida } from "@/services/api";
import { Fingerprint } from "lucide-react";

const Index = () => {
  const [batidas, setBatidas] = useState<Batida[]>([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [tipo, setTipo] = useState("entrada");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [saldoRefreshKey, setSaldoRefreshKey] = useState(0);

  const fetchBatidas = useCallback(async () => {
    try {
      const data = await getBatidas();
      setBatidas(data);
    } catch {
      // silently fail on fetch
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
      setSaldoRefreshKey((k) => k + 1);
    } catch {
      setToast({ message: "❌ Erro ao registrar ponto", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <div className="w-full max-w-sm">
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-5 py-4 flex items-center gap-3">
            <Fingerprint className="h-6 w-6 text-primary-foreground" />
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

          <div className="p-5 flex flex-col gap-4">
            <TipoSelector value={tipo} onChange={setTipo} />
            <BaterPontoButton onClick={handleBaterPonto} loading={loading} tipo={tipo} />

            <SaldoWidget refreshKey={saldoRefreshKey} />

            <div>
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Batidas de hoje
              </h2>
              <BatidasList batidas={batidas} loading={listLoading} />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <DownloadExtension />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-3">
          Extensão Chrome — Ponto Eletrônico v1.0
        </p>
      </div>
    </div>
  );
};

export default Index;
