// app/layout.tsx
import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const brandFont = localFont({
  src: './diesel-jenny-font.woff2',
  display: 'swap',
  variable: '--font-brand'
});

export const metadata: Metadata = {
  title: "Diesel Jenny",
  description: "Official website for Diesel Jenny.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${brandFont.variable} font-sans`}>{children}</body>
    </html>
  );
}