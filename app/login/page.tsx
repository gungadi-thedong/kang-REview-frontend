"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Username:", username, "Password:", password);
  };

  return (
    <main className="min-h-screen bg-[#0b1623] text-white flex flex-col items-center">
      {/* 🔹 Navbar */}
      <nav className="w-full flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold">Kang Review</h1>
        <a href="/" className="text-lg hover:underline">
          Home
        </a>
      </nav>

      {/* 🔹 Form Login */}
      <div className="flex flex-col justify-center items-center flex-grow">
        <h2 className="text-3xl font-[Cinzel] mb-8">Login</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-[#363636] p-8 rounded-2xl shadow-xl w-80 flex flex-col items-center gap-4 border border-white"
        >
          {/* Username */}
          <div className="w-full">
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-full bg-[#2c2c2c] text-white border border-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div className="w-full relative">
            <label className="block text-sm mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 pr-10 rounded-full bg-[#2c2c2c] text-white border border-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {/* 🔹 Tombol lihat/sembunyikan password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-white transition"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* 🔹 Tombol aksi */}
          <div className="flex flex-col items-center w-full mt-3">
            <Link
              href="/register" // 🔹 arahkan ke halaman register
              className="text-white underline mb-2 hover:text-blue-400 transition"
            >
              Register
            </Link>

            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-full transition"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

