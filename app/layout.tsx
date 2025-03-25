import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biobank Ethical AI Compliance and Optimization Navigator powered by BiobankingAI",
  description: "BEACON - Biobank Ethical AI Compliance and Optimization Navigator powered by BiobankingAI.",
  openGraph: {
    title: "Biobank Ethical AI Compliance and Optimization Navigator powered by BiobankingAI",
    description: "Your AI-powered biobank sample locator.",
    url: "https://beacon-virid.vercel.app/",
    images: [
      {
        url: "/logo.png", // Replace with your actual social image path if needed
        width: 800,
        height: 600,
        alt: "BEACON Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
