import {
  RESTError,
  RESTGetAPIChannelMessageResult,
  RESTGetAPIChannelMessagesQuery,
  RESTGetAPIChannelMessagesResult,
} from "discord-api-types/v10";
import { FetcherService } from "../service/fetcher";
import { FetchMessageService } from "../service/message/fetch";
import { Result } from "@mikuroxina/mini-fn";

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
