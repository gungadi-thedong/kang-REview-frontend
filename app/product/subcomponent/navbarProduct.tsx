"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = [
    "All",
    "Motherboard",
    "Handphone",
    "Laptop",
    "GPU",
    "Processor",
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value.trim();
    const currentCategory = searchParams.get("category");

    const matchedCategory = categories.find(
      (cat) => cat.toLowerCase() === newSearch.toLowerCase()
    );

    if (matchedCategory && matchedCategory !== "All") {
      router.push(`/product?category=${encodeURIComponent(matchedCategory)}`);
    } else {
      const newUrl = currentCategory
        ? `/product?category=${currentCategory}&search=${encodeURIComponent(newSearch)}`
        : `/product?search=${encodeURIComponent(newSearch)}`;
      router.push(newUrl);
    }
  };

  const handleCategorySelect = (category: string) => {
    setIsDropdownOpen(false);
    if (category === "All") {
      router.push("/product");
    } else {
      router.push(`/product?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <nav className="fixed w-full flex items-center justify-between px-16 py-5 bg-[#0b1623] text-white font-sans z-50">
      {/* Logo */}
      <div className="flex flex-col leading-tight cursor-pointer" onClick={() => router.push("/")}>
        <span className="font-extrabold text-xl">Kang</span>
        <span className="font-extrabold text-xl">Review</span>
      </div>

      {/* Menu Tengah */}
      <div className="flex items-center gap-10 font-semibold text-base">
        {/* Search Bar */}
        <div className="flex items-center border border-white rounded-lg px-3 py-2 w-[300px] gap-2">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products..."
            defaultValue={searchParams.get("search") || ""}
            onChange={handleSearchChange}
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
          />
        </div>

        <Link href="/" className="hover:text-gray-400 transition-colors">
          Home
        </Link>

        {/* Dropdown Category */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="hover:text-gray-400 transition-colors"
          >
            By Category
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-[#0b1623] border border-gray-600 rounded-md shadow-lg z-50">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="block text-left w-full px-4 py-2 hover:bg-gray-700 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tombol Login */}
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

