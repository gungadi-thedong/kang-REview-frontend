"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Review = {
  id_review: null | undefined;
  id: number;
  judul: string;
};

export default function ReviewCage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/reviews")
      .then((res) => res.json())
      .then((json) => {
        setReviews(json.data);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="px-8 py-16 bg-[#0b1623]">
      <h2 className="text-2xl font-bold text-white mb-6">Available Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <button
            key={review.id_review}
            onClick={() => router.push(`/article?id=${review.id_review}`)}
            className="bg-[#111e2e] hover:bg-[#16263a] p-6 rounded-xl text-left transition"
          >
            <h3 className="text-lg font-semibold text-white">{review.judul}</h3>
            <p className="text-sm text-gray-400 mt-2">Read full review →</p>
          </button>
        ))}
      </div>
    </section>
  );
}
