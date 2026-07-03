export type ResourceStatus = "ACTIVE" | "INACTIVE" | "DEACTIVATED" | "DELETED";

export type Currency = "USD" | "RWF" | "GBP";

export const CURRENCIES: Currency[] = ["USD", "RWF", "GBP"];

export interface IIndustry {
  id: number;
  name: string;
  code: string;
  status?: ResourceStatus;
}

export interface ICountry {
  id: number;
  name: string;
  isoCode: string;
  countryCode: string;
  currency: Currency;
  status?: ResourceStatus;
}

export interface IBank {
  id: number;
  name: string;
  code: string;
  status?: ResourceStatus;
  countryName?: string;
  countryIsoCode?: string;
}

export interface IIndustryDto {
  name: string;
  code: string;
}

export interface ICountryDto {
  name: string;
  isoCode: string;
  countryCode: string;
  currency: Currency;
}

export interface IBankDto {
  name: string;
  code: string;
  countryIsoCode: string;
}

export type ResourceType = "industries" | "countries" | "banks";
