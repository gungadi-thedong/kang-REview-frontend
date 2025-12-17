"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductArticle({ reviewId }: { reviewId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-gray-400">Loading...</div>;
  }

  if (!review) {
    return <div className="text-gray-400">Review not found</div>;
  }

  return (
    <section className="bg-[#0b1623] text-white min-h-screen px-8 pt-28">
      <button
        onClick={() => router.back()}
        className="mb-6 text-gray-300 hover:text-white"
      >
        ← Back
      </button>
      <h1 className="text-3xl md:text-5xl font-bold mb-4">{review.judul}</h1>

      <p className="text-gray-300 mb-10">{review.paragraf_buka}</p>

      {review.gambar_1 && (
        <img
          src={review.gambar_1}
          alt={review.judul}
          className="rounded-xl mb-10"
        />
      )}
    </section>
  );
}
