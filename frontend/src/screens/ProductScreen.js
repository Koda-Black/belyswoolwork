import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";

import data from "../data";
import FeaturedProducts from "../components/FeaturedProducts";
import Newsletter from "../components/Newsletter";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ProductScreen = () => {
  const { slug } = useParams();

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    product: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/v1/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.productList });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <section id="productDetails" className="section-p1">
          <div className="single-pro-img">
            <img
              src="/images/products/f1.jpg"
              width="100%"
              id="mainImg"
              alt="product description"
            />

            <div className="small-img-group">
              <div className="small-img-col">
                <img
                  src="/images/products/f2.jpg"
                  width="100%"
                  className="small-img"
                  alt="product variation"
                />
              </div>

              <div className="small-img-col">
                <img
                  src="/images/products/f3.jpg"
                  width="100%"
                  className="small-img"
                  alt="product variation"
                />
              </div>

              <div className="small-img-col">
                <img
                  src="/images/products/f4.jpg"
                  width="100%"
                  className="small-img"
                  alt="product variation"
                />
              </div>
            </div>
          </div>

          <div className="single__Product-details">
            <h6>Home / T-Shirt</h6>
            <h4>{product.name}</h4>
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
              fit preshrunk jersey knit provides unmatched comfort with each
              wear. Featuring a taped neck and shoulder, and a seamless
              double-needle collar, and available in a range of colors, it
              offers it all in the ultimate head-turning package.
            </span>
          </div>
        </section>
      )}
      <FeaturedProducts products={data.products} limits={4} />
      <Newsletter />
    </>
  );
};
