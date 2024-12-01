import * as React from 'react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { text: 'בית', isActive: true },
  { text: 'לוח מודעות' },
  { text: 'סיוע שכונתי' },
  { text: 'מניינים' }
];

export function Navbar() {
  return (
    <nav className="flex flex-wrap gap-8 justify-between items-center px-5 py-2.5 w-full bg-white shadow-xl rounded-[30px]" role="navigation">
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
          <div
            key={index}
            className={`my-auto ${item.isActive ? 'text-indigo-500 font-semibold' : 'text-gray-400'}`}
          >
            {item.text}
          </div>
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
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/34f84af3c8632e8bfe2f55daa61109dcedd0eded7ccf81089672ba8cdccc7be1?placeholderIfAbsent=true&apiKey=86fe1a7bbf6141b4b43b46544552077e"
          alt="Icon 3"
          className="object-contain w-10 aspect-square"
        />
      </div>
    </nav>
  );
}
