export enum ECurrency {
  USD = "USD",
  RWF = "RWF",
  GBP = "GBP",
}

export enum EChannel {
  BANK_ACCOUNT = "BANK_ACCOUNT",
  MOBILE_MONEY = "MOBILE_MONEY",
}

export enum EPaymentMethod {
  MTN_MOBILE_MONEY = "MTN_MOBILE_MONEY",
  AIRTEL_MONEY = "AIRTEL_MONEY",
}

export enum EPaymentProvider {
  FLUTTERWAVE = "FLUTTERWAVE",
  FDI="FDI",
  POKET_MONEY="POKET_MONEY",
}

export enum EStatus {
  PENDING = "PENDING",
  SUCCESSFUL = "SUCCESSFUL",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum EApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
