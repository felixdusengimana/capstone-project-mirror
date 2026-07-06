import { ECurrency } from ".";

export interface ITransaction {
  amount: number;
  note: string;
  id: number;
  transactionFee: number;
  transactionReference: string;
  paidAt: string;
  donorName: string;
  donorEmail?: string;
  currency: ECurrency;
  creatorName: string;
  creatorUserName: string;
}

export interface ITransactionFilter {
  startDate: string;
  endDate: string;
  donorName: string;
  pageNumber: number;
  pageSize: number;
}
