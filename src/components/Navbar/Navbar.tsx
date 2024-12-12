"use client";
import React from "react";
import Link from "next/link";
import { BsGear } from "react-icons/bs";
import { BsCalendar4 } from "react-icons/bs";
import { usePathname } from "next/navigation";
import useUserStore from "@/stores/userStore";

export function Navbar() {
  const user = useUserStore((state) => state.user);
  const pathname = usePathname();

  const navItems = [
    { text: "בית", href: "/home" },
    { text: "לוח מודעות", href: "/events" },
    { text: "סיוע שכונתי", href: "/neighborhood-help/loans" },
    { text: "מניינים", href: "/minyans" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-2 w-full bg-white shadow-lg rounded-full">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ccfbd72e5d22d626233f17bc13421272bd81f685b76d5e7a707c52f342dadbe?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
          alt="Logo"
          className="w-28 object-contain"
        />
      </div>

      {/* Navigation Items */}
      <div className="hidden md:flex gap-8 items-center">
        {navItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div
              className={`cursor-pointer transition-colors duration-200 ${pathname === item.href
                ? "text-indigo-600 font-semibold"
                : "text-gray-500 hover:text-indigo-400"
                }`}
            >
              {item.text}
            </div>
          </Link>
        ))}
      </div>

      {/* Icons */}
      <div className="flex gap-6 items-center">
        <Link href="/settings/preferences">
          <BsGear
            className="text-gray-500 hover:text-indigo-400 transition-colors duration-200 cursor-pointer text-xl"
            title="Settings"
          />
        </Link>
        <Link href={`/calendar/${user?._id}`}>
          <BsCalendar4
            className="text-gray-500 hover:text-indigo-400 transition-colors duration-200 cursor-pointer text-xl"
            title="Calendar"
          />
        </Link>
        <Link href="/settings/myProfile">
          <img
            loading="lazy"
            src={user?.profile_picture_url}
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>
      </div>
    </nav>
  );
}
