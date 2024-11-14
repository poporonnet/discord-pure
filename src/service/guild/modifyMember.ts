import type { Result } from "@mikuroxina/mini-fn";
import {
  type APIGuildMember,
  type RESTError,
  type RESTPatchAPICurrentGuildMemberJSONBody,
  Routes,
} from "discord-api-types/v10";
import type { FetcherService } from "../fetcher";

export class ModifyGuildMemberService {
  constructor(private fetcher: FetcherService) {}

  /**
   * Modify the current member in a guild.
   * @see https://discord.com/developers/docs/resources/guild#modify-current-member
   */
  modifyCurrentMember(
    guildId: string,
    body: RESTPatchAPICurrentGuildMemberJSONBody
  ): Promise<Result.Result<RESTError | Error, APIGuildMember>> {
    return this.fetcher.patch<
      RESTPatchAPICurrentGuildMemberJSONBody,
      APIGuildMember
    >(Routes.guildMember(guildId, "@me"), body);
  }
}
