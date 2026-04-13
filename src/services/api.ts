const BASE_URL = "http://localhost:3000";

export interface Batida {
  id?: string;
  timestamp: string;
  tipo: "ENTRADA" | "SAIDA" | "INTERVALO" | "RETORNO";
}

export async function getBatidas(): Promise<Batida[]> {
  const res = await fetch(`${BASE_URL}/batidas`);
  if (!res.ok) throw new Error("Erro ao buscar batidas");
  return res.json();
}

export async function postBatida(batida: Omit<Batida, "id">): Promise<Batida> {
  const res = await fetch(`${BASE_URL}/batidas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(batida),
  });
  if (!res.ok) throw new Error("Erro ao registrar ponto");
  return res.json();
}

export interface Saldo {
  mesAno: string;
  saldoMinutos: number;
  saldoFormatado: string;
}

export async function getSaldo(mesAno: string): Promise<Saldo> {
  const res = await fetch(`${BASE_URL}/saldo?mesAno=${encodeURIComponent(mesAno)}`);
  if (!res.ok) throw new Error("Erro ao buscar saldo");
  return res.json();
}
