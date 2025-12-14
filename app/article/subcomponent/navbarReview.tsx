"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className=" fixed w-full flex justify-between items-center px-50 pt-7 pb-5 bg-[#0b1623] text-white">
      
      {/* Logo */}
      <div>
       <Image 
        src="/Kang Riview.png"
        alt="logo"
        width={80}
        height={40}/>
      </div>

      {/* Menu */}
      <div className=" w-full justify-center flex gap-15 font-bold text-base">
        <Link href="/" className="hover:text-gray-500">
          Home
        </Link>
        <Link href="/product" className="hover:text-gray-500">
          Product
        </Link>

        <Link href="/AboutSection" className="hover:text-gray-500">
          About
        </Link>
      </div>

      {/* Tombol login */}
       <div className="flex justify-center pr-5">
      <Link
        href="/login"
        className="bg-white text-black px-10 py-1 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
      >
        Login
      </Link>
    </div>
      
    </nav>
  );
}
