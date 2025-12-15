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
  const id = searchParams.get("id") || "Produk Tanpa Nama";

  return (
    <main>
      <Navbar />
      {id && <ProductTitle reviewId={id} />}
      <ReviewSection />
      <SpecTable category={category} /> {/* otomatis sesuai kategori */}
      <AboutSection />
      <Footer />
    </main>
  );
}
