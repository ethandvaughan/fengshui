import type { Metadata } from "next";
import { Kodchasan } from "next/font/google";
import "./globals.css";
import Header from "@/app/header";
import Footer from "./footer";

const kodchasan = Kodchasan({
  weight: "300",
})

export const metadata: Metadata = {
  title: "Feng Shui",
  description: "Create your feng shui room",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={kodchasan.className}>
      <body className="flex flex-col">
        <Header />
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
