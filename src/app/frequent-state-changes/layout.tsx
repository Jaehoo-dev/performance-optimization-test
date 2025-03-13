import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <main className="flex w-4xl mx-auto p-6">{children}</main>;
}
