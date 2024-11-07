import { MessageController } from "../controller/message";
import { FetcherService } from "../service/fetcher";

export class Client {
  private readonly baseUrl = "https://discord.com/api/v10";

  public readonly message: MessageController;

  constructor(token: string) {
    const fetcher = new FetcherService(token, this.baseUrl);

    this.message = new MessageController(fetcher);
  }
}
