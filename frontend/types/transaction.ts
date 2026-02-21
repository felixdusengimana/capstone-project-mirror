export interface ITransaction {
  amount: number;
  note: string;
  id: number;
  transactionFee: number;
  transactionReference: string;
  paidAt: string;
}

export interface ITransactionFilter {
  startDate: string;
  endDate: string;
  donorName: string;
  pageNumber: number;
  pageSize: number;
}
