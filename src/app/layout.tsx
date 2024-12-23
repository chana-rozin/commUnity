"use client";

import { Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import useUserStore from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserModeLayout from "@/components/Layout/UserModeLayout";
import { useEffect, useState } from "react";

const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ["hebrew"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  }, [user, router]);

  return (
    <html lang="he" dir="rtl" className={notoSansHebrew.className}>
      <body className="flex flexbox flex-col px-12 py-3 bg-violet-50">
        <ToastContainer
          toastClassName="bg-indigo-500 text-white"
          progressClassName="bg-indigo-700"
        />
        <QueryProvider>
          {user ? <UserModeLayout>{children}</UserModeLayout> : children}
        </QueryProvider>
      </body>
    </html>
  );
}
