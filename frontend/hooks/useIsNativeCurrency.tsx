import { ECurrency } from "@/types";

export default function useIsNativeCurrency({
  currency,
}: {
  currency: ECurrency;
}) {
  return currency === ECurrency.RWF;
}
