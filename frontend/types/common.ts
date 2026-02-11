export interface ICountry {
  id: number;
  name: string;
  capital: string;
  flag: string;
  currency: string;
  shortCode: string;
  currencyCode: string;
  callingCode: string;
  region: string;
}

export interface IResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
