import * as React from "react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { MdOutlineAlternateEmail, MdOutlinePhone } from "react-icons/md";

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white mt-6 p-6 rounded-xl">
      <div className="container flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6">
        {/* Logo Section */}
        <div className="flex flex-col items-center ">
          <img
            src="https://res.cloudinary.com/community-cloud/image/upload/v1734513910/commUnity_6_ww9dxs.png"
            alt="Logo"
            className="w-36 max-w-sm"
          />
          <p className="text-sm text-center lg:text-right">
            התחברו, שתפו וקחו חלק בקהילה שלנו.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-center lg:items-start space-y-2">
          <h3 className="text-lg font-semibold">ניווט</h3>
          <a href="/home" className="hover:text-indigo-300">בית</a>
          <a href="/about" className="hover:text-indigo-300">אודות</a>
          <a href="/contact" className="hover:text-indigo-300">צור קשר</a>
        </nav>

        {/* Contact Info */}
        <div className="flex flex-col items-center lg:items-start space-y-2">
          <h3 className="text-lg font-semibold">יצירת קשר</h3>
          <div className="flex items-center gap-2 text-sm">
            <MdOutlineAlternateEmail className="w-5 h-5" />
            <span>support@community.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MdOutlinePhone className="w-5 h-5" />
            <span>053-316-2293</span>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="text-lg font-semibold">עקבו אחרינו</h3>
          <div className="flex justify-center lg:justify-start gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-indigo-300">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-indigo-300">
              <FaXTwitter className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-indigo-300">
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 border-t pt-4 text-sm text-white text-center">
        <p>
          © {new Date().getFullYear()} commUnity. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
