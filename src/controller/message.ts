import type {
  RESTError,
  RESTGetAPIChannelMessageResult,
  RESTGetAPIChannelMessagesQuery,
  RESTGetAPIChannelMessagesResult,
  RESTPostAPIChannelMessageJSONBody,
  RESTPostAPIChannelMessageResult,
} from "discord-api-types/v10";
import type { FetcherService } from "../service/fetcher";
import { CreateMessageService } from "../service/message/create";
import { FetchMessageService } from "../service/message/fetch";
import type { Result } from "../utility/result";

/**
 * Controller for message features.
 */
export class MessageController {
  private readonly fetchMessage: FetchMessageService;
  private readonly createMessage: CreateMessageService;

  constructor(fetcher: FetcherService) {
    this.fetchMessage = new FetchMessageService(fetcher);
    this.createMessage = new CreateMessageService(fetcher);
  }

  /**
   * Retrieve the messages in a channel.
   * @param channelId Channel ID to get messages.
   * @param option Query options to filter messages.
   * @example Retrieving the last 10 messages in the channel.
   * ```
   * const result = await client.message.getMany("CHANNEL_ID", { limit: 10 });
   * ```
   */
  async getMany(
    channelId: string,
    option?: RESTGetAPIChannelMessagesQuery
  ): Promise<Result<RESTGetAPIChannelMessagesResult, RESTError | Error>> {
    return this.fetchMessage.fetchMany(channelId, option);
  }

  /**
   * Retrieve a message in a channel.
   * @param channelId Channel ID to get message.
   * @param messageId Message ID to get.
   * @example Retrieving a specific message.
   * ```
   * const result = await client.message.get("CHANNEL_ID", "MESSAGE_ID");
   * ```
   */
  async get(
    channelId: string,
    messageId: string
  ): Promise<Result<RESTGetAPIChannelMessageResult, RESTError | Error>> {
    return this.fetchMessage.fetch(channelId, messageId);
  }

  /**
   * Post a message to a channel.
   * @param channelId Channel ID to send message.
   * @param body Message contents, embeds, etc.
   * @example Posting a text message.
   * ```
   * const result = await client.message.create("CHANNEL_ID", { content: "Hello, world!" });
   * ```
   */
  async create(
    channelId: string,
    body: RESTPostAPIChannelMessageJSONBody
  ): Promise<Result<RESTPostAPIChannelMessageResult, RESTError | Error>> {
    return this.createMessage.create(channelId, body);
  }
}
