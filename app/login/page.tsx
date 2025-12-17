"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("permission", data.permission);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect based on role
      if (data.permission === "admin" || data.permission === "author") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b1623] text-white flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold">Kang Review</h1>
        <Link href="/" className="text-lg hover:underline">
          Home
        </Link>
      </nav>

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
              className="w-full px-3 py-2 rounded-full bg-[#2c2c2c] text-white border border-white"
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
              className="w-full px-3 py-2 pr-10 rounded-full bg-[#2c2c2c] text-white border border-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Actions */}
          <div className="flex flex-col items-center w-full mt-3">
            <Link
              href="/register"
              className="underline mb-2 hover:text-blue-400"
            >
              Register
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-full"
            >
              {loading ? "Logging in..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
