import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import data from "./data";
import Navbar from "./components/Navbar";
import { Home } from "./screens/Home";
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
        <div className="pages">
          <Routes>
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>
      </div>

      <div>
        <main>
          <section id="product1" className="section-p1"></section>
          <h2>Featured Products</h2>
          <p>Summer Collection Top Design</p>
          <div className="product__container">
            {data.products.map((product) => (
              <div className="product" key={product.id}>
                <img src={product.image} alt={product.name} />

                <div className="description">
                  <span>{product.brand}</span>
                  <h5>{product.name}</h5>
                  {/* <div className="star">
                    <ion-icon className="starIcon" name="star"></ion-icon>
                    <ion-icon className="starIcon" name="star"></ion-icon>
                    <ion-icon className="starIcon" name="star"></ion-icon>
                    <ion-icon className="starIcon" name="star"></ion-icon>
                  </div> */}

                  <p>{product.rating}</p>
                  <h4>{product.price}</h4>
                </div>

                <a href="/cart">
                  <ion-icon name="cart-outline" className="cartIcon"></ion-icon>
                </a>
              </div>
            ))}
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
