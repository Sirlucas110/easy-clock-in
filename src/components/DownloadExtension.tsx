import { Download, Chrome, Shield, Clock } from "lucide-react";

const DownloadExtension = () => {
  const handleDownload = () => {
    fetch("/ponto-eletronico-extension.zip")
      .then((res) => {
        if (!res.ok) throw new Error(`Download failed: ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "ponto-eletronico-extension.zip";
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Chrome className="h-5 w-5 text-primary" />
        Instalar Extensão Chrome
      </h2>

      <button
        onClick={handleDownload}
        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-all mb-5"
      >
        <Download className="h-5 w-5" />
        Baixar Extensão (.zip)
      </button>

      <div className="space-y-3 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Como instalar:</p>
        <ol className="list-decimal list-inside space-y-1.5">
          <li>Descompacte o arquivo ZIP baixado</li>
          <li>
            Abra <code className="bg-muted px-1.5 py-0.5 rounded text-xs">chrome://extensions</code> no Chrome
          </li>
          <li>Ative o <strong>Modo do desenvolvedor</strong> (canto superior direito)</li>
          <li>Clique em <strong>Carregar sem compactação</strong></li>
          <li>Selecione a pasta descompactada</li>
        </ol>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { icon: Clock, label: "Registro rápido" },
          { icon: Shield, label: "Seguro" },
          { icon: Chrome, label: "Chromium" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1 text-center">
            <Icon className="h-5 w-5 text-primary" />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadExtension;
