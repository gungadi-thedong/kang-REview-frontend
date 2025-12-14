"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [gmail, setGmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak sama!");
      return;
    }
    console.log("Gmail:", gmail);
    console.log("Username:", username);
    console.log("Password:", password);
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

      {/* 🔹 Form Register */}
      <div className="flex flex-col justify-center items-center flex-grow">
        <h2 className="text-3xl font-[Cinzel] mb-8">Register</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-[#363636] border-2 border-white p-8 rounded-2xl shadow-xl w-80 flex flex-col items-center gap-4"
        >
          {/* Gmail */}
          <div className="w-full">
            <label className="block text-sm mb-1">Gmail</label>
            <input
              type="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              className="w-full px-3 py-2 rounded-full bg-[#2c2c2c] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Username */}
          <div className="w-full">
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-full bg-[#2c2c2c] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-3 py-2 pr-10 rounded-full bg-[#2c2c2c] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-7 text-gray-400 hover:text-white"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="w-full relative">
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 pr-10 rounded-full bg-[#2c2c2c] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-7 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? "🙈" : "👁"}
            </button>
          </div>

          {/* Tombol */}
          <div className="flex flex-col items-center w-full mt-3">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-white underline mb-2 hover:text-blue-400"
            >
              Login
            </button>
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

