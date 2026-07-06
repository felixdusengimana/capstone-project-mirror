import { ComponentProps } from "react";

interface TrustiesProps extends ComponentProps<"p"> {}

export default function Trusties({ className, ...props }: TrustiesProps) {
  return (
    <p {...props} className={`text-[#8A8A8B] mt-24 text-base ${className}`}>
      Trusted Users <br />
      Rated 4.5 by 700K+ Customers
    </p>
  );
}
