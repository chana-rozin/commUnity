import * as React from "react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";


export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-500 to-purple-500  text-white mt-12 p-6 rounded-xl">
      <div className="container flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6">
        {/* Logo Section */}
        <div className="flex flex-col items-center lg:items-start">
          <img
            src="https://res.cloudinary.com/community-cloud/image/upload/v1733663053/commUnity_3_ysedyp.png"
            alt="Logo"
            className="w-24 max-w-sm"
          />
          <p className="text-sm text-center lg:text-right">
            התחברו, שתפו וקחו חלק בקהילה שלנו.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-center lg:items-start space-y-2">
          <h3 className="text-lg font-semibold">ניווט</h3>
          <a href="/home" className="hover:text-indigo-600">בית</a>
          <a href="/about" className="hover:text-indigo-600">אודות</a>
          <a href="/contact" className="hover:text-indigo-600">צור קשר</a>
          <a href="/faq" className="hover:text-indigo-600">שאלות נפוצות</a>
        </nav>

        {/* Contact Info */}
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="text-lg font-semibold">יצירת קשר</h3>
          <p className="text-sm">support@community.com</p>
          <p className="text-sm">טלפון: 03-1234567</p>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="text-lg font-semibold">עקבו אחרינו</h3>
          <div className="flex gap-5">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook/>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaXTwitter/>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram/>
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
