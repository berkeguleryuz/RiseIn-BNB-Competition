// "use client"
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Omegayon BNB Risein",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-zinc-50 to-zinc-300 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-950 bg-clip-text text-transparent font-mono text-lg dark:font-mono dark:text-white text-gray-900">
        <div className="dark:text-white text-gray-900">{children}</div>
      </body>
    </html>
  );
}
