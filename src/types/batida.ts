export interface BatidaResponse {
  id?: string;
  timestamp: string;
  tipo: "ENTRADA" | "SAIDA" | "INTERVALO" | "RETORNO";
}
