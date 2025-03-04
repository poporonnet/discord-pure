import type {
  RESTGetAPIChannelMessageResult,
  RESTGetAPIChannelMessagesQuery,
  RESTGetAPIChannelMessagesResult,
} from "discord-api-types/rest";
import { type RESTError, Routes } from "discord-api-types/v10";
import type { Result } from "../../utility/result";
import type { FetcherService } from "../fetcher";

export class FetchMessageService {
  constructor(private fetcher: FetcherService) {}

  /**
   * Get messages in a channel.
   * @see https://discord.com/developers/docs/resources/message#get-channel-messages
   */
  async fetchMany(
    channelId: string,
    query?: RESTGetAPIChannelMessagesQuery
  ): Promise<Result<RESTGetAPIChannelMessagesResult, RESTError | Error>> {
    return this.fetcher.get(Routes.channelMessages(channelId), { ...query });
  }

  /**
   * Get a message in a channel.
   * @see https://discord.com/developers/docs/resources/message#get-channel-message
   */
  async fetch(
    channelId: string,
    messageId: string
  ): Promise<Result<RESTGetAPIChannelMessageResult, RESTError | Error>> {
    return this.fetcher.get(Routes.channelMessage(channelId, messageId));
  }
}
