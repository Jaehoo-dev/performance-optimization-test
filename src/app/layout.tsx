import { ReactNode } from "react";
import "./globals.css";
import { ReactScan } from "@/components/ReactScan";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <ReactScan />
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
