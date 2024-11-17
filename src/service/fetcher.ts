import { type Record, Result } from "@mikuroxina/mini-fn";
import type { RESTError } from "discord-api-types/v10";

type QueryParameters = Partial<Record<string, string | number>>;

export class FetcherService {
  /**
   * @param token Bot token.
   * @param baseUrl Base URL of the API without trailing slash.
   * @example
   * ```
   * const fetcher = new FetcherService("BOT_TOKEN", "https://discord.com/api/v10");
   * ```
   */
  constructor(
    private token: string,
    private baseUrl: string
  ) {}

  /**
   * Send `GET` request to the API.
   * @param path Path of an endpoint.
   * @param query Query parameters to be appended to the URL.
   * @example Send `GET` request with some query parameters to the API.
   * ```
   * const result = await fetcher.get<GetUsersResult>("/users", { limit: 10 });
   * ```
   */
  async get<Data extends object>(
    path: string,
    query?: QueryParameters
  ): Promise<Result.Result<RESTError | Error, Data>> {
    const url = this.url(path, query);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: this.header(),
      });

      const data = await response.json();
      if (!response.ok) {
        return Result.err(data as RESTError);
      }

      return Result.ok(data as Data);
    } catch (err) {
      return Result.err(Error(`Failed to \`GET ${url}\``, { cause: err }));
    }
  }

  /**
   * Send `POST` request to the API.
   * @param path Path of an endpoint.
   * @param body Request body to be sent.
   * @example
   * ```
   * const result = await fetcher.post<PostUsersRequest, PostUsersResult>("/users", { name: "Alice" });
   * ```
   */
  async post<Body extends object, Data extends object>(
    path: string,
    body: Body
  ): Promise<Result.Result<RESTError | Error, Data>> {
    const url = this.url(path);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          ...this.header(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        return Result.err(data as RESTError);
      }

      return Result.ok(data as Data);
    } catch (err) {
      return Result.err(Error(`Failed to \`POST ${url}\``, { cause: err }));
    }
  }

  /**
   * Send `PATCH` request to the API.
   * @param path Path of an endpoint.
   * @param body Request body to be sent.
   * @example
   * ```
   * const result = await fetcher.patch<PatchUserRequest, PatchUserResult>("/users/123", { name: "Bob" });
   * ```
   */
  async patch<Body extends object, Data extends object>(
    path: string,
    body: Body
  ): Promise<Result.Result<RESTError | Error, Data>> {
    const url = this.url(path);

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          ...this.header(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        return Result.err(data as RESTError);
      }

      return Result.ok(data as Data);
    } catch (err) {
      return Result.err(Error(`Failed to \`PATCH ${url}\``, { cause: err }));
    }
  }

  /**
   * Build full URL of an endpoint.
   * @param path Path of an endpoint.
   * @param query Query parameters to be appended to the URL.
   */
  private url(path: string, query?: QueryParameters): string {
    const queryString = Object.entries(query || {})
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    return `${this.baseUrl}${path}${queryString}`;
  }

  /**
   * Build common headers object for the API request.
   */
  private header(): Record<string, string> {
    return {
      Authorization: `Bot ${this.token}`,
    };
  }
}
