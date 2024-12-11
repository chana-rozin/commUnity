"use client" 
import React from 'react'; 
import Link from 'next/link'; 
import { usePathname } from 'next/navigation'; 
import useUserStore from "@/stores/userStore";
 
export function Navbar() { 
  const user = useUserStore((state) => state.user);
  const pathname = usePathname(); 
 
  const navItems = [ 
    { text: 'בית', href: '/home' }, 
    { text: 'לוח מודעות', href: '/events' }, 
    { text: 'סיוע שכונתי', href: '/neighborhood-help/loans' }, 
    { text: 'מניינים', href: '/minyans' } 
  ]; 
 
  return ( 
    <nav className="sticky top-0 z-50 flex flex-wrap gap-8 justify-between items-center px-5 py-2.5 w-full bg-white shadow-xl rounded-[30px]" role="navigation"> 
      {/* Logo */} 
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ccfbd72e5d22d626233f17bc13421272bd81f685b76d5e7a707c52f342dadbe?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e" 
        alt="Logo" 
        className="object-contain shrink-0 self-stretch my-auto aspect-[5.1] w-[179px]" 
      /> 
 
      {/* Navigation Items */} 
      <div className="flex gap-8 items-center text-sm text-gray-400"> 
        {navItems.map((item, index) => ( 
          <Link key={index} href={item.href}> 
            <div 
              className={`my-auto ${pathname === item.href ? 'text-indigo-500 font-semibold' : 'text-gray-400'}`} 
            > 
              {item.text} 
            </div> 
          </Link> 
        ))} 
      </div> 
 
      {/* Icons */} 
      <div className="flex gap-5 justify-center items-center self-stretch my-auto"> 
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/58c57f95b6b06bc6177a94d3b0f8d29f95bba760bad1489949de4c21efec601a?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e" 
          alt="Icon 1" 
          className="object-contain w-5 aspect-square" 
        /> 
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b1f8b38ee02b38a77d634e850e03128dc00f24a206e2287a385882b48c8ad58?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e" 
          alt="Icon 2" 
          className="object-contain w-5 aspect-square" 
        /> 
        <img 
          loading="lazy" 
          src={user?.profile_picture_url}
          alt="Icon 3" 
          className="object-contain w-10  aspect-square rounded-full" 
        /> 
      </div> 
    </nav> 
  ); 
}