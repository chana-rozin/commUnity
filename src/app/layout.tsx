// src/app/layout.tsx
import { Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import {Footer} from "@/components/Footer/Footer"
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
      <body className="flex flex-col px-12 pt-3 pb-6 bg-violet-50 max-md:px-5 ">
        <Navbar/>
        <QueryProvider>
          {children}
        </QueryProvider>
        <Footer/>
      </body>
    </html>
  );
}