import { Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";

const notoSansHebrew = Noto_Sans_Hebrew({ 
  subsets: ['hebrew'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap' // Helps with font loading
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={notoSansHebrew.className}>
      <body>{children}</body>
    </html>
  );
}