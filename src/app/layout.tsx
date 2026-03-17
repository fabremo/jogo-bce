import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { montserrat } from "@/lib/fonts";



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
    <html
      lang="en"
      className={cn("font-sans", montserrat.variable)}
      suppressHydrationWarning
    >
      <body
        className={`${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
