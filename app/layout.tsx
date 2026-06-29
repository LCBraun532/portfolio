import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lance Braun — Content Strategy Portfolio",
  description: "Senior Content Strategist specializing in fintech, financial services, and industrial B2B content.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
