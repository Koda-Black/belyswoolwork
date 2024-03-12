import React from "react";
import { Link } from "react-router-dom";
import data from "../data";
import FeaturedProducts from "../components/FeaturedProducts";

export const HomeScreen = () => {
  return (
    <div>
      <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to 70% off!</p>
        <button>
          <Link to="/shop">Shop Now</Link>
        </button>
      </section>
      <section id="feature" className="section-p1">
        {data.features.map((feature) => (
          <div className="feature__box" key={feature.title}>
            <img src={feature.image} alt={feature.title} />
            <h6>{feature.title}</h6>
          </div>
        ))}
      </section>
      <FeaturedProducts />
      <section id="banner" className="section-m1">
        <h4>Trending wool pieces</h4>
        <h2>
          Up to<span> 50% off</span> - All fabrics & Accessories
        </h2>
        <button className="normal">Explore More</button>
      </section>
    </div>
  );
};
