import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pak Wheels",
  description: "Users can buy, sell & rent cars on Pak Wheels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
