import { SaldoResponse } from "@/types/saldo";
import Service from "./service";

class SaldoService extends Service {
  static getSaldo(mesAno: string) {
    return this.Http.get<SaldoResponse>("saldo", { mesAno }).then(this.getData);
  }
}

export default SaldoService;
