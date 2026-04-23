import { ReactNode, Suspense } from "react";

export default function JoinLayout({ children }: {children: ReactNode} ) {
  return <Suspense>{children}</Suspense>;
}
