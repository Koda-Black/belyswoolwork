import React from "react";
import { useParams } from "react-router-dom";
import data from "../data";

export const ProductScreen = () => {
  const params = useParams;
  const { slug } = params;

  return (
    <main>
      {/* <section id="productDetails" className="section-p1">
        {data.products.map((product) => (
          <div classNameName="single-pro-img" key={product.name}>
            <img
              src={product.image}
              alt={product.name}
              width="100%"
              id="mainImg"
            />
            <div classNameName="small-img-group">
              <div classNameName="small-img-col">
                <img
                  src={product.images}
                  alt={product.subCategory}
                  width="100%"
                  classNameName="small-img"
                />
              </div>
            </div>
          </div>
        ))}
      </section> */}

      <section id="productDetails" className="section-p1">
        <div className="single-pro-img">
          <img
            src="img/products/f1.jpg"
            width="100%"
            id="mainImg"
            alt="product description"
          />

          <div className="small-img-group">
            <div className="small-img-col">
              <img
                src="img/products/f2.jpg"
                width="100%"
                className="small-img"
                alt="product variation"
              />
            </div>

            <div className="small-img-col">
              <img
                src="img/products/f3.jpg"
                width="100%"
                className="small-img"
                alt="product variation"
              />
            </div>

            <div className="small-img-col">
              <img
                src="img/products/f4.jpg"
                width="100%"
                className="small-img"
                alt="product variation"
              />
            </div>
          </div>
        </div>

        <div className="single__Product-details">
          <h6>Home / T-Shirt</h6>
          <h4>Men's Fashion T Shirt</h4>
          <h2>₦16,000</h2>
          <select>
            <option>Select Size</option>
            <option>XL</option>
            <option>XXL</option>
            <option>Small</option>
            <option>Large</option>
            <option>XLarge</option>
          </select>
          <input type="number" value="1" />
          <button className="normal">Add To Cart</button>
          <h4>Product Details</h4>
          <span>
            The Gildan Ultra Cotton T-shirt is made from a substantial 6.0 oz.
            per sq. yd. fabric constructed from 100% cotton, this classNameic
            fit preshrunk jersey knit provides unmatched comfort with each wear.
            Featuring a taped neck and shoulder, and a seamless double-needle
            collar, and available in a range of colors, it offers it all in the
            ultimate head-turning package.
          </span>
        </div>
      </section>

      <h1>{slug}</h1>
    </main>
  );
};
