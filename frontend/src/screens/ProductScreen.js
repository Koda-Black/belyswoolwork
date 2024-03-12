import React from "react";
import { useParams } from "react-router-dom";
import data from "../data";

export const ProductScreen = () => {
  const params = useParams;
  const { slug } = params;

  return (
    <main>
      <section id="productDetails" class="section-p1">
        {data.products.map((product) => (
          <div className="single-pro-img" key={product.name}>
            <img src={product.image} alt={product.name} width="100%" />
            <div id="mainImg">
              <div className="small-img"></div>
              <div className="small-img"></div>
              <div className="small-img"></div>
            </div>
          </div>
        ))}
      </section>

      <h1>{slug}</h1>
    </main>
  );
};
