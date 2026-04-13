const BASE_URL = "http://localhost:3000";

interface HttpResponse<T> {
  data: T;
}

class Http {
  static async get<T>(endpoint: string, params?: Record<string, string>): Promise<HttpResponse<T>> {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`GET ${endpoint} failed`);
    const data = await res.json();
    return { data };
  }

  static async post<T>(endpoint: string, body: unknown): Promise<HttpResponse<T>> {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${endpoint} failed`);
    const data = await res.json();
    return { data };
  }
}

class Service {
  protected static Http = Http;

  protected static getData<T>(response: HttpResponse<T>): T {
    return response.data;
  }
}

export default Service;
