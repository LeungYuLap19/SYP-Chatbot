import "./globals.css";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Chatbot', // to be named
  description: 'Senior Year Project Chatbot'
  // icons: { icon: '...url...' }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`} >
        <NextTopLoader color="#2A7144" height={4} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
