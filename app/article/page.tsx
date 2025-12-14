"use client";

import Navbar from "./subcomponent/navbarReview";
import ProductTitle from "./subcomponent/ProductArticle";
import ReviewSection from "./subcomponent/ReviewSection";
import SpecTable from "./subcomponent/SpecSection";
import AboutSection from "../component/AboutSection";
import Footer from "../component/Footer";
import { useSearchParams } from "next/navigation";

export default function ProductArticle() {
  const searchParams = useSearchParams();

  // ambil data dari query URL
  const category = searchParams.get("category") || "Laptop";
  const name = searchParams.get("name") || "Produk Tanpa Nama";

  return (
    <main>
      <Navbar />
      <ProductTitle productName={name} category={category} />
      <ReviewSection />
      <SpecTable category={category} /> {/* otomatis sesuai kategori */}
      <AboutSection />
      <Footer />
    </main>
  );
}

