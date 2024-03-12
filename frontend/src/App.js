import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { HomeScreen } from "./screens/HomeScreen";
import { ProductScreen } from "./screens/ProductScreen";
import { Shop } from "./screens/Shop";
import { Contact } from "./screens/Contact";
import { About } from "./screens/About";
import { Cart } from "./screens/Cart";
import { Blog } from "./screens/Blog";
// import { Signup } from "./screens/Signup";

function App() {
  return (
    <BrowserRouter>
      <div id="siteContainer">
        <Navbar />
        <main className="pages">
          <Routes>
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
