import { describe, it, expect, vi, beforeEach } from "vitest";

const BASE_URL = "http://localhost:3000";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

const { default: SaldoService } = await import("@/services/saldoService");

describe("SaldoService.getSaldo", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("should return positive saldo", async () => {
    const mockSaldo = { mesAno: "2026-04", saldoMinutos: 150, saldoFormatado: "02:30" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSaldo),
    });

    const result = await SaldoService.getSaldo("2026-04");
    expect(result).toEqual(mockSaldo);
    expect(result.saldoMinutos).toBeGreaterThanOrEqual(0);
  });

  it("should return negative saldo", async () => {
    const mockSaldo = { mesAno: "2026-04", saldoMinutos: -75, saldoFormatado: "01:15" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSaldo),
    });

    const result = await SaldoService.getSaldo("2026-04");
    expect(result.saldoMinutos).toBeLessThan(0);
    expect(result.saldoFormatado).toBe("01:15");
  });

  it("should throw on API error", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

    await expect(SaldoService.getSaldo("2026-04")).rejects.toThrow();
  });
});
