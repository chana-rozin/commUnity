// src/app/layout.tsx
import { Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import QueryProvider from "./QueryProvider";


const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ['hebrew'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'commUnity',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="he" dir="rtl" className={notoSansHebrew.className}>
      <body className="flex flex-col px-12 pt-6 pb-60 bg-violet-50 max-md:px-5 max-md:pb-24">
        <Navbar/>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}