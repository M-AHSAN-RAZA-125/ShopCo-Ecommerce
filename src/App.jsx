import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Announcement from "./components/Announcement/Announcement";
import Nav from "./components/NavBar/Nav.jsx";
import Newsletter from "./components/Newsletter/Newsletter.jsx";
import Footer from "./components/Footer/Footer.jsx";

import BrandName from "./components/BrandsName/BrandName.jsx";
import Hero from "./components/Hero/Hero.jsx";
import ProductCard from "./components/Cards/Cards.jsx";
import TopSelling from "./components/TopSelling/TopSelling.jsx";
import DressStyle from "./components/DressStyle/DressStyle.jsx";
import Testimonials from "./components/Testimonials/Testimonials.jsx";

import ProductDetail from "./components/ProductDetail/ProductDetail.jsx";
import CategoryPage from "./components/CategoryPage/CategoryPage.jsx";
import Cart from "./components/Cart/Cart.jsx"; // <-- Cart Import Add Kiya

// Automatic Scroll To Top Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Home = () => (
  <>
    <Hero />
    <BrandName />
    <ProductCard />
    <TopSelling />
    <DressStyle />
    <Testimonials />
  </>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Announcement />
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/casual" element={<CategoryPage />} />
        <Route path="/cart" element={<Cart />} /> {/* <-- Route Add Kiya */}
      </Routes>

      <Newsletter />
      <Footer />
    </>
  );
}

export default App;