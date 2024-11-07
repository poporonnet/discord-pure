import { Result } from "@mikuroxina/mini-fn";
import { FetcherService } from "../fetcher";
import {
  RESTGetAPIChannelMessagesResult,
  RESTGetAPIChannelMessagesQuery,
  RESTGetAPIChannelMessageResult,
} from "discord-api-types/rest";
import { RESTError } from "discord-api-types/v10";

export class FetchMessageService {
  constructor(private fetcher: FetcherService) {}

  async fetchAll(
    channelId: string,
    query?: RESTGetAPIChannelMessagesQuery
  ): Promise<
    Result.Result<RESTError | Error, RESTGetAPIChannelMessagesResult>
  > {
    return this.fetcher.get(`/channels/${channelId}/messages`, { ...query });
  }

  async fetch(
    channelId: string,
    messageId: string
  ): Promise<Result.Result<RESTError | Error, RESTGetAPIChannelMessageResult>> {
    return this.fetcher.get(`/channels/${channelId}/messages/${messageId}`);
  }
}
