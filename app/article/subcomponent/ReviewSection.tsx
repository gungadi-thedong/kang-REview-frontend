"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [comments, setComments] = useState<any[]>([]);
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [nama, setNama] = useState("");
  const [komentar, setKomentar] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`http://127.0.0.1:8000/api/reviews/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        console.log("API DATA:", data); // IMPORTANT
        setReview(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;

    fetch(`http://127.0.0.1:8000/api/reviews/${id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.data);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama || !komentar) return;

    const res = await fetch(
      `http://127.0.0.1:8000/api/reviews/${id}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, komentar }),
      }
    );

    const data = await res.json();

    // Append new comment without refetch
    setComments((prev) => [...prev, data.data]);
    setNama("");
    setKomentar("");
  };

  console.log("REVIEW STATE:", review);

  if (!review) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Review not found
      </div>
    );
  }

  return (
    <section className="bg-[#0b1623] text-white px-8 py-16">
      {/* REVIEW CONTENT */}
      <h1 className="text-3xl font-bold mb-4">{review.judul}</h1>

      <p className="text-gray-300 mb-6">{review.paragraf_buka}</p>

      {review.gambar_1 && (
        <img
          src={review.gambar_1}
          alt={review.judul}
          className="rounded-xl mb-6"
        />
      )}

      <p className="text-gray-300 mb-12">{review.paragraf_jelaskan}</p>

      {/* COMMENTS */}
      <div className="border-t border-gray-700 pt-8">
        <h2 className="text-xl font-semibold mb-4">Komentar</h2>

        {comments.length === 0 ? (
          <p className="text-gray-400">Belum ada komentar.</p>
        ) : (
          <div className="space-y-4 mb-8">
            {comments.map((c) => (
              <div key={c.id_komentar} className="bg-[#111e2e] p-4 rounded-lg">
                <p className="font-semibold text-white">{c.username}</p>
                <p className="text-gray-300 text-sm">{c.komentar}</p>
              </div>
            ))}
          </div>
        )}

        {/* COMMENT FORM */}
        <form onSubmit={submitComment} className="space-y-3">
          <input
            type="text"
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full bg-[#111e2e] text-white p-3 rounded-lg outline-none"
          />

          <textarea
            placeholder="Tulis komentar..."
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
            className="w-full bg-[#111e2e] text-white p-3 rounded-lg outline-none"
            rows={3}
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold"
          >
            Kirim Komentar
          </button>
        </form>
      </div>
    </section>
  );
}
