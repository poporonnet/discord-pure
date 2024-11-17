import type { Result } from "@mikuroxina/mini-fn";
import type {
  RESTGetAPIChannelMessageResult,
  RESTGetAPIChannelMessagesQuery,
  RESTGetAPIChannelMessagesResult,
} from "discord-api-types/rest";
import { type RESTError, Routes } from "discord-api-types/v10";
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
  ): Promise<
    Result.Result<RESTError | Error, RESTGetAPIChannelMessagesResult>
  > {
    return this.fetcher.get(Routes.channelMessages(channelId), { ...query });
  }

  /**
   * Get a message in a channel.
   * @see https://discord.com/developers/docs/resources/message#get-channel-message
   */
  async fetch(
    channelId: string,
    messageId: string
  ): Promise<Result.Result<RESTError | Error, RESTGetAPIChannelMessageResult>> {
    return this.fetcher.get(Routes.channelMessage(channelId, messageId));
  }
}
