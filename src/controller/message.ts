import type { Result } from "@mikuroxina/mini-fn";
import type {
  RESTError,
  RESTGetAPIChannelMessageResult,
  RESTGetAPIChannelMessagesQuery,
  RESTGetAPIChannelMessagesResult,
} from "discord-api-types/v10";
import type { FetcherService } from "../service/fetcher";
import { FetchMessageService } from "../service/message/fetch";

export class MessageController {
  private fetchMessage: FetchMessageService;

  constructor(fetcher: FetcherService) {
    this.fetchMessage = new FetchMessageService(fetcher);
  }

  async getAll(
    channelId: string,
    option?: RESTGetAPIChannelMessagesQuery
  ): Promise<
    Result.Result<RESTError | Error, RESTGetAPIChannelMessagesResult>
  > {
    return this.fetchMessage.fetchAll(channelId, option);
  }

  async get(
    channelId: string,
    messageId: string
  ): Promise<Result.Result<RESTError | Error, RESTGetAPIChannelMessageResult>> {
    return this.fetchMessage.fetch(channelId, messageId);
  }
}
