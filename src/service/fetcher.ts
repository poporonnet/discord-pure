import { type Record, Result } from "@mikuroxina/mini-fn";
import type { RESTError } from "discord-api-types/v10";

type QueryParameters = Partial<Record<string, string | number>>;

export class FetcherService {
  constructor(
    private token: string,
    private baseUrl: string
  ) {}

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

  async post<Body extends object,Data extends object>(
    path: string,
    body: Body
  ): Promise<Result.Result<RESTError | Error, Data>> {
    const url = this.url(path);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: this.header(),
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

  private url(path: string, query?: QueryParameters): string {
    const queryString = Object.entries(query || {})
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    return `${this.baseUrl}${path}${queryString}`;
  }

  private header(): Record<string, string> {
    return {
      Authorization: `Bot ${this.token}`,
    };
  }
}
