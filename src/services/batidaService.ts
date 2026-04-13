import { BatidaResponse } from "@/types/batida";
import Service from "./service";

class BatidaService extends Service {
  static listarBatidas() {
    return this.Http.get<BatidaResponse[]>("batidas").then(this.getData);
  }

  static registrarBatida(data: Omit<BatidaResponse, "id">) {
    return this.Http.post<BatidaResponse>("batidas", data).then(this.getData);
  }
}

export default BatidaService;
