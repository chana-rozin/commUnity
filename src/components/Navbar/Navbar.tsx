"use client";
import React, {useState, useRef, useEffect} from "react";
import Link from "next/link";
import { BsGear } from "react-icons/bs";
import { BsCalendar4 } from "react-icons/bs";
import { usePathname } from "next/navigation";
import useUserStore from "@/stores/userStore";
import MenuPopup from "./MenuePopup";

export function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  
  const user = useUserStore((state) => state.user);
  const pathname = usePathname();

  // Close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { text: "בית", href: "/home" },
    { text: "לוח מודעות", href: "/events-ads" },
    { text: "סיוע שכונתי", href: "/neighborhood-help/loans" },
    // { text: "מניינים", href: "/minyans/regular" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

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
        <div ref={popupRef} onClick={toggleMenu}>
          <img
            loading="lazy"
            src={user?.profile_picture_url}
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        {isOpen && <MenuPopup popupRef={popupRef} />}
      </div>
    </nav>
  );
}
