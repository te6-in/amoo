import type { Metadata } from "next";

import "@/styles/globals.css";

import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <body className="bg-body dark:bg-body-dark">
        <main>{children}</main>
      </body>
    </html>
  );
}
