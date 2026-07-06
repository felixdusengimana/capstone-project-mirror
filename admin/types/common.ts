export interface IResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ISorted<T> {
  results: T[];
  limit: number;
  offset: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  empty: boolean;
}
