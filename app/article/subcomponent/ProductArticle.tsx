"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArticlePage({ productName, category }: { productName: string; category: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const productsData: Record<
    string,
    { id: number; name: string; image: string }[]
  > = {
    Motherboard: [
      { id: 1, name: "ASUS ROG STRIX B550-F", image: "/Asset1.png" },
      { id: 2, name: "MSI MAG B660M MORTAR", image: "/Asset2.png" },
      { id: 3, name: "Gigabyte AORUS Z690 ELITE", image: "/Asset3.png" },
    ],
    Processor: [
      { id: 1, name: "AMD Ryzen 7 7700X", image: "/Asset4.png" },
      { id: 2, name: "Intel Core i7-13700K", image: "/Asset5.png" },
    ],
    GPU: [
      { id: 1, name: "NVIDIA RTX 4070", image: "/Asset6.png" },
      { id: 2, name: "AMD RX 7800 XT", image: "/Asset7.jpeg" },
    ],
    Handphone: [
      { id: 1, name: "Samsung Galaxy S23", image: "/Asset8.jpg" },
      { id: 2, name: "iPhone 15 Pro", image: "/Asset9.jpg" },
    ],
    Laptop: [
      { id: 1, name: "Dell XPS 13", image: "/Asset1.png" },
      { id: 2, name: "MacBook Air M2", image: "/Asset2.png" },
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
    <section className="bg-[#0b1623] text-white min-h-screen flex flex-col items-center justify-start px-8 md:px-20 pt-28 pb-20 font-sans">
      {/* Tombol kembali */}
      <button
        onClick={() => router.back()}
        className="absolute top-10 left-10 text-sm text-gray-300 hover:text-white border border-gray-500 px-4 py-2 rounded-lg transition-colors"
      >
        ← Kembali
      </button>

      {/* Judul utama */}
      <h1 className="text-3xl md:text-5xl font-bold text-center max-w-3xl leading-snug mb-4">
        {product.name}
      </h1>

      {/* Subjudul (teks lorem) di bawah judul dan di atas gambar */}
      <p className="text-gray-300 text-center max-w-2xl mb-10 leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipiscing elit. 
        Quisque faucibus ex sapien vitae pellentesque sem placerat. 
        In id cursus mi pretium tellus convallis.
      </p>

      {/* Gambar di bawah subjudul */}
      <div className="w-full max-w-3xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded-xl shadow-lg object-cover"
          onError={(e) => (e.currentTarget.src = '/Kang Riview.png')}
        />
      </div>
    </section>
  );
}
