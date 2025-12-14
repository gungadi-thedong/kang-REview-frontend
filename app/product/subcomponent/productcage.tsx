"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CategorySection() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 🔹 Semua data produk
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

  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";

  // 🔹 Gabungkan semua produk dari semua kategori
  const allProducts = Object.entries(productsData).flatMap(([category, products]) =>
    products.map((product) => ({ ...product, category, uniqueId: `${category}-${product.id}` }))
  );

  const [filteredData, setFilteredData] = useState(allProducts);

  // 🔹 Filter data berdasarkan kategori & pencarian
  useEffect(() => {
    let filtered = allProducts;

    // Jika ada kategori yang dipilih (dari navbar)
    if (selectedCategory && productsData[selectedCategory]) {
      filtered = productsData[selectedCategory].map((p) => ({ ...p, category: selectedCategory, uniqueId: `${selectedCategory}-${p.id}` }));
    }

    // Jika ada pencarian
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.specs.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.review.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [selectedCategory, searchTerm]);

  // 🔹 Klik menuju halaman artikel
  const handleProductClick = (product: any) => {
    router.push(`/article?name=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}`);
  };

  return (
    <section className="bg-[#0b1623] text-white min-h-screen pt-40 pb-20 px-20 font-sans">
      {/* 🔹 Header judul */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <h2 className="text-2xl font-bold border-b-2 border-white pb-2 md:pb-0">
          {selectedCategory ? selectedCategory : "Semua Produk"}
        </h2>
      </div>

      {/* 🔹 Grid produk */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <article
              key={item.uniqueId}
              onClick={() => handleProductClick(item)}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300 cursor-pointer hover:scale-105"
            >
              <div className="aspect-video bg-gray-700 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/Kang Riview.png")}
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-white">{item.name}</h3>
                <p className="text-gray-300 text-sm mb-3 font-medium">{item.specs}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.review}</p>
              </div>
            </article>
          ))
        ) : (
          <p className="text-gray-400 text-center mt-5 col-span-full">
            Tidak ada produk yang cocok.
          </p>
        )}
      </div>
    </section>
  );
}
