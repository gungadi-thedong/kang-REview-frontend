"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [namaUser, setNamaUser] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nama_user: namaUser,
          email,
          username,
          password,
        }),
      });

      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      const data = JSON.parse(text);

      if (!res.ok) {
        throw new Error(data.message || "Register gagal");
      }

      alert("Registrasi berhasil, silakan login");
      router.push("/login");
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
        <a href="/" className="text-lg hover:underline">
          Home
        </a>
      </nav>

      {/* Form */}
      <div className="flex flex-col justify-center items-center flex-grow">
        <h2 className="text-3xl mb-8">Register</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-[#363636] border border-white p-8 rounded-2xl shadow-xl w-80 flex flex-col gap-4"
        >
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Nama */}
          <input
            placeholder="Nama"
            value={namaUser}
            onChange={(e) => setNamaUser(e.target.value)}
            required
            className="input"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />

          {/* Username */}
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />

          {/* Confirm */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input"
          />

          <button
            disabled={loading}
            type="submit"
            className="bg-gray-700 hover:bg-gray-600 py-2 rounded-full font-semibold"
          >
            {loading ? "Processing..." : "Register"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="underline text-sm"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
