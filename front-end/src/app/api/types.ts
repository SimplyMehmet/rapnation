export type FetchResult<T> = {
  result?: T;
  error?: string;
  status: number;
};
