"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const productsData: Record<
    string,
    { id: number; name: string; specs: string; review: string; image: string }[]
  > = {
    Motherboard: [
      { id: 1, name: "ASUS ROG STRIX B550-F", specs: "AMD B550, ATX, WiFi 6", review: "Excellent build quality and performance.", image: "/Asset1.png" },
      { id: 2, name: "MSI MAG B660M MORTAR", specs: "Intel B660, mATX, DDR4", review: "Great value for gaming builds.", image: "/Asset2.png" },
      { id: 3, name: "Gigabyte AORUS Z690 ELITE", specs: "Intel Z690, ATX, PCIe 5.0", review: "Top-tier features for enthusiasts.", image: "/Asset3.png" },
    ],
    Processor: [
      { id: 1, name: "AMD Ryzen 7 7700X", specs: "8 cores, 16 threads, 4.5GHz", review: "Outstanding performance for gaming and productivity.", image: "/Asset4.png" },
      { id: 2, name: "Intel Core i7-13700K", specs: "16 cores, 24 threads, 5.4GHz", review: "Excellent for high-end builds.", image: "/Asset5.png" },
    ],
    GPU: [
      { id: 1, name: "NVIDIA RTX 4070", specs: "12GB GDDR6X, DLSS 3", review: "Excellent 1440p performance.", image: "/Asset6.png" },
      { id: 2, name: "AMD RX 7800 XT", specs: "16GB GDDR6, FSR 3", review: "Competitive pricing.", image: "/Asset7.jpeg" },
    ],
    Handphone: [
      { id: 1, name: "Samsung Galaxy S23", specs: "Snapdragon 8 Gen 2, 8GB RAM", review: "Outstanding camera and display.", image: "/Asset8.jpg" },
      { id: 2, name: "iPhone 15 Pro", specs: "A17 Pro, 8GB RAM", review: "Premium iOS experience.", image: "/Asset9.jpg" },
    ],
    Laptop: [
      { id: 1, name: "Dell XPS 13", specs: "Intel i7, 16GB RAM, 512GB SSD", review: "Ultra-portable with great performance.", image: "/Asset1.png" },
      { id: 2, name: "MacBook Air M2", specs: "Apple M2, 8GB RAM, 256GB SSD", review: "Excellent battery life and design.", image: "/Asset2.png" },
    ],
  };

  const allProducts = Object.entries(productsData).flatMap(([category, products]) =>
    products.map((product) => ({ ...product, category }))
  );

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (name) {
      const decodedName = decodeURIComponent(name as string);
      const foundProduct = allProducts.find((p) => p.name === decodedName);
      setProduct(foundProduct);
    }
  }, [name]);

  if (!product) {
    return (
      <div className="bg-[#0b1623] text-white min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Produk tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <section className="bg-[#0b1623] text-white min-h-screen flex flex-col items-center justify-start px-8 md:px-24 py-20 font-sans">
      {/* Tombol kembali */}
      <button
        onClick={() => router.back()}
        className="absolute top-10 left-10 text-sm text-gray-300 hover:text-white border border-gray-500 px-4 py-2 rounded-lg transition-colors"
      >
        ← Kembali
      </button>

      {/* Review Section */}
      <div className="w-full max-w-5xl">
        {/* Judul Review */}
        <h2 className="text-3xl font-bold mb-6 text-left border-b border-gray-700 pb-2">
          Review
        </h2>

        {/* Isi Review */}
        <div className="text-gray-300 leading-relaxed text-justify space-y-6">
          {product.review.split("\n").map((para: string, idx: number) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
