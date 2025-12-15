import Navbar from "./subcomponent/navbarProduct";
import CategorySection from "./subcomponent/productcage";
import AboutSection from "../component/AboutSection";
import Footer from "../component/Footer";


export default function ProductPage() {
    return(
        <main>
        <Navbar />
       <CategorySection/>
        <AboutSection/>
       <Footer/>
      
        </main>
    )
}
  
  