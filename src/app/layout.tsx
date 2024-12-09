"use client";
import { Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import QueryProvider from "./QueryProvider";
import useUserStore from "@/stores/userStore";
import { useRouter } from "next/navigation"; // Import useRouter
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ['hebrew'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  const router = useRouter(); // Initialize the router

  // Redirect to /register if no user is found
  // useEffect(() => {
  //   if (!user) {
  //     router.push("/register");
  //   }
  // }, [user, router]);

  return (
    <html lang="he" dir="rtl" className={notoSansHebrew.className}>
      <body className="flex flex-col px-12 pt-3 pb-60 bg-violet-50 max-md:px-5 max-md:pb-24">
        <Navbar />
        <ToastContainer
                toastClassName="bg-indigo-500 text-white"
                progressClassName="bg-indigo-700"
            />
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
