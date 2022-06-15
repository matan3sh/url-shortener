export interface Url {
  _id: string;
  baseUrl: string;
  urlId: string;
  createdAt: string;
}

export interface UrlState {
  urls: Url[];
  url: Url | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export type UrlPayload = Pick<Url, "baseUrl">;

export type DeleteUrlPayload = { message: string; urlId: string };
