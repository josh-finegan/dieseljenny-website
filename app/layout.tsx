import type { Metadata } from "next";
import { Anton, Bebas_Neue } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-brand",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Diesel Jenny",
  description: "Official Diesel Jenny website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${bebas.variable} font-bebas antialiased`}>
        {children}
      </body>
    </html>
  );
}
