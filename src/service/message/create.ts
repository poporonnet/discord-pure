import {
  type RESTError,
  type RESTPostAPIChannelMessageJSONBody,
  type RESTPostAPIChannelMessageResult,
  Routes,
} from "discord-api-types/v10";
import type { Result } from "../../utility/result";
import type { FetcherService } from "../fetcher";

export class CreateMessageService {
  constructor(private readonly fetcher: FetcherService) {}

  /**
   * Create a message on a channel.
   * @see https://discord.com/developers/docs/resources/message#create-message
   */
  async create(
    channelId: string,
    body: RESTPostAPIChannelMessageJSONBody
  ): Promise<Result<RESTPostAPIChannelMessageResult, RESTError | Error>> {
    return this.fetcher.post(Routes.channelMessages(channelId), body);
  }
}
