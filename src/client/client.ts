import { GuildController } from "../controller/guild";
import { MessageController } from "../controller/message";
import { FetcherService } from "../service/fetcher";

export class Client {
  private readonly baseUrl = "https://discord.com/api/v10";

  public readonly message: MessageController;
  public readonly guild: GuildController;

  /**
   * @param token Bot token.
   * @example
   * ```
   * const client = new Client("BOT_TOKEN");
   * ```
   */
  constructor(token: string) {
    const fetcher = new FetcherService(token, this.baseUrl);

    this.message = new MessageController(fetcher);
    this.guild = new GuildController(fetcher);
  }
}
