import Navbar from "./component/Navbar";
import HeroSection from "./component/HeroSection";
import ProductSection from "./component/ProductSection";
import ArticleSection from "./component/ArticleSection";
import AboutSection from "./component/AboutSection";
import Footer from "./component/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProductSection />
      <ArticleSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
