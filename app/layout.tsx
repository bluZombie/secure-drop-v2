import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VaultDrop — Secure File Transfer",
  description: "Send files securely with end-to-end encryption, expiring links, and zero-knowledge architecture.",
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
