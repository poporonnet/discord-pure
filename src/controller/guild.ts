import type { Result } from "@mikuroxina/mini-fn";
import type {
  APIGuildMember,
  RESTError,
  RESTPatchAPICurrentGuildMemberJSONBody,
} from "discord-api-types/v10";
import type { FetcherService } from "../service/fetcher";
import { ModifyGuildMemberService } from "../service/guild/modifyMember";

/**
 * Controller for guild features.
 */
export class GuildController {
  private readonly modifyMember: ModifyGuildMemberService;

  constructor(fetcher: FetcherService) {
    this.modifyMember = new ModifyGuildMemberService(fetcher);
  }

  /**
   * Modify the current member in a guild.
   * @param guildId Guild ID to modify current member.
   * @param body Member parameters to set.
   * @example Changing current member's nickname.
   * ```
   * const result = await client.guild.modifyCurrentMember("GUILD_ID", { nick: "Alice" });
   * ```
   */
  async modifyCurrentMember(
    guildId: string,
    body: RESTPatchAPICurrentGuildMemberJSONBody
  ): Promise<Result.Result<RESTError | Error, APIGuildMember>> {
    return this.modifyMember.modifyCurrentMember(guildId, body);
  }
}
