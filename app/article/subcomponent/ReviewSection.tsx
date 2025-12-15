"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  console.log("ReviewSection rendered");
  console.log("Query ID:", id);

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
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  console.log("REVIEW STATE:", review);

  if (!review) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Review not found
      </div>
    );
  }

  return (
    <section className="bg-[#0b1623] text-white min-h-screen px-8 py-20">
      <button
        onClick={() => router.back()}
        className="mb-6 text-gray-300 hover:text-white"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{review.judul}</h1>

      <p className="text-gray-400 mb-6">{review.paragraf_buka}</p>

      {review.gambar_1 && (
        <img
          src={review.gambar_1}
          alt={review.judul}
          className="mb-6 rounded-lg"
        />
      )}

      <p className="text-gray-300">{review.paragraf_jelaskan}</p>
    </section>
  );
}
