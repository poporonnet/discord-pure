import type { Result } from "@mikuroxina/mini-fn";
import {
  type RESTError,
  type RESTPostAPIChannelMessageJSONBody,
  type RESTPostAPIChannelMessageResult,
  Routes,
} from "discord-api-types/v10";
import type { FetcherService } from "../fetcher";

export class CreateMessageService {
  constructor(private readonly fetcher: FetcherService) {}

  /**
   * Create a message in a channel.
   * @see https://discord.com/developers/docs/resources/message#create-message
   */
  async create(
    channelId: string,
    body: RESTPostAPIChannelMessageJSONBody
  ): Promise<
    Result.Result<RESTError | Error, RESTPostAPIChannelMessageResult>
  > {
    return this.fetcher.post(Routes.channelMessages(channelId), body);
  }
}
