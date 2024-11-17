import type { Result } from "@mikuroxina/mini-fn";
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

export class MessageController {
  private readonly fetchMessage: FetchMessageService;
  private readonly createMessage: CreateMessageService;

  constructor(fetcher: FetcherService) {
    this.fetchMessage = new FetchMessageService(fetcher);
    this.createMessage = new CreateMessageService(fetcher);
  }

  async getMany(
    channelId: string,
    option?: RESTGetAPIChannelMessagesQuery
  ): Promise<
    Result.Result<RESTError | Error, RESTGetAPIChannelMessagesResult>
  > {
    return this.fetchMessage.fetchMany(channelId, option);
  }

  async get(
    channelId: string,
    messageId: string
  ): Promise<Result.Result<RESTError | Error, RESTGetAPIChannelMessageResult>> {
    return this.fetchMessage.fetch(channelId, messageId);
  }

  /**
   * Create a message in a channel.
   * @param channelId Channel ID to send message
   * @param body Message contents, embeds, etc.
   * @returns success: {@link RESTGetAPIChannelMessageResult} , error: {@link RESTError} or {@link Error}
   */
  async create(
    channelId: string,
    body: RESTPostAPIChannelMessageJSONBody
  ): Promise<
    Result.Result<RESTError | Error, RESTPostAPIChannelMessageResult>
  > {
    return this.createMessage.create(channelId, body);
  }
}
