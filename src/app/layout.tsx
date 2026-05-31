import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DocBrain — AI Sales Agent for Your Business",
  description:
    "DocBrain is your AI agent that automates your full sales process — catalog, chat, checkout, and order confirmation. Join early access.",
  openGraph: {
    title: "DocBrain — AI Sales Agent for Your Business",
    description:
      "Automate your full sales process with an AI agent trained on your catalog and docs.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocBrain — AI Sales Agent",
    description:
      "Your AI agent that automates your full sales process for your business.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
