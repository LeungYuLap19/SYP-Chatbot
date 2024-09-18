import "./globals.css";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

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
      </body>
    </html>
  );
}
