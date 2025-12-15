"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Review = {
  id_review: number;
  judul: string;
  paragraf_buka: string;
  gambar_1: string;
  kategori?: string;
};

export default function ProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const searchTerm = searchParams.get("search") || "";

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all reviews (Laravel API)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch reviews:", err);
        setLoading(false);
      });
  }, []);

  // 🔹 Filter by category & search
  const filteredReviews = reviews.filter((review) => {
    const categoryMatch = selectedCategory
      ? review.kategori?.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const searchMatch =
      review.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.paragraf_buka.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // 🔹 Navigate to article
  const goToArticle = (id: number) => {
    router.push(`/article?id=${id}`);
  };

  if (loading) {
    return (
      <section className="bg-[#0b1623] text-white min-h-screen pt-40 px-20">
        <p className="text-gray-400">Loading products...</p>
      </section>
    );
  }

  return (
    <section className="bg-[#0b1623] text-white min-h-screen pt-40 pb-20 px-20 font-sans">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold border-b-2 border-white inline-block pb-2">
          {selectedCategory || "Semua Produk"}
        </h1>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <article
              key={review.id_review}
              onClick={() => goToArticle(review.id_review)}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer
                         hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              <div className="aspect-video bg-gray-700">
                <img
                  src={review.gambar_1}
                  alt={review.judul}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/Kang Riview.png")}
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{review.judul}</h3>
                <p className="text-gray-400 text-sm">
                  {review.paragraf_buka.slice(0, 120)}...
                </p>
              </div>
            </article>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            Produk tidak ditemukan.
          </p>
        )}
      </div>
    </section>
  );
}
