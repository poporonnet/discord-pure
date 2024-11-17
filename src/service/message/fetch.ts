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

  async fetchMany(
    channelId: string,
    query?: RESTGetAPIChannelMessagesQuery
  ): Promise<
    Result.Result<RESTError | Error, RESTGetAPIChannelMessagesResult>
  > {
    return this.fetcher.get(Routes.channelMessages(channelId), { ...query });
  }

  async fetch(
    channelId: string,
    messageId: string
  ): Promise<Result.Result<RESTError | Error, RESTGetAPIChannelMessageResult>> {
    return this.fetcher.get(Routes.channelMessage(channelId, messageId));
  }
}
