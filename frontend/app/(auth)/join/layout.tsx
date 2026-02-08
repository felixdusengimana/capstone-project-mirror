import { PropsWithChildren, Suspense } from "react";

export default function JoinLayout({ children }: PropsWithChildren) {
  return <Suspense>{children}</Suspense>;
}
