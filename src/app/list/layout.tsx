import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex justify-center h-screen w-2xl mx-auto shadow-md p-6">
      {children}
    </main>
  );
}
