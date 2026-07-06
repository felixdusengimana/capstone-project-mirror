export interface IResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ISorted<T> {
  results: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  empty: boolean;
}
