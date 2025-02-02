import { ServiceBase } from "../../base/ServiceBase.js";
import { Response } from "../responses/Response.js";

export class PingService extends ServiceBase {
  constructor() {
    super("/ping");
  }

  async getPing<T>(config = this.defaultConfig): Promise<Response<T>> {
    return await this.get<T>(this.url, config);
  }
}
