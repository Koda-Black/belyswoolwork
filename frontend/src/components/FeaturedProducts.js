import React from "react";
import data from "../data";
import { Link } from "react-router-dom";
import { PiShoppingCartBold } from "react-icons/pi";
import { AiFillStar } from "react-icons/ai";

const FeaturedProducts = ({ products, limits }) => {
  return (
    <section id="product1" className="section-p1">
      <h2>Featured Products</h2>
      <p>Summer Collection Top Design</p>
      <div className="product__container">
        {data.products.slice(0, limits).map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="description">
              <span>{product.brand}</span>
              <Link to={`/product/${product.slug}`}>
                <h5>{product.name}</h5>
              </Link>
              <div className="star">
                <AiFillStar className="starIcon" />
                <AiFillStar className="starIcon" />
                <AiFillStar className="starIcon" />
                <AiFillStar className="starIcon" />
                <AiFillStar className="starIcon" />
              </div>
              <h4>₦ {product.price}</h4>
            </div>

            <Link to="/cart">
              <PiShoppingCartBold className="cartIcon" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
