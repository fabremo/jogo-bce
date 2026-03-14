import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import { Montserrat } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jogo BCE",
  description: "Treine seus BCEs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
