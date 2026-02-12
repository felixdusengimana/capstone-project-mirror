export interface IResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ISorted<T> {
  results: T[];
  limit: number;
  offset: number;
  total: number;
  empty: boolean;
}
