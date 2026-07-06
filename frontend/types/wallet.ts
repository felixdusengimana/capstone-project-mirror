import { z } from "zod";
import { ECurrency } from ".";

export interface IWallet {
  balance: number;
  currency: ECurrency;
}
