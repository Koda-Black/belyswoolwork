import React, { useReducer } from "react";
import { useEffect } from "react";
import logger from "use-reducer-logger";
// import data from "../data";
import axios from "axios";
import { Link } from "react-router-dom";
import { PiShoppingCartBold } from "react-icons/pi";
import { Rating } from "./Rating";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, productList: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const FeaturedProducts = ({ products, limits }) => {
  const [{ loading, error, productList }, dispatch] = useReducer(
    logger(reducer),
    {
      loading: true,
      error: "",
      productList: [],
    }
  );
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/v1/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.productList });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
      // setProductList(result.data.productList);
    };
    fetchData();
  }, []);

  return (
    <section id="product1" className="section-p1">
      <h2>Featured Products</h2>
      <p>Summer Collection Top Design</p>
      <div className="product__container">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          productList.slice(0, limits).map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="description">
                <span>{product.brand}</span>
                <Link to={`/product/${product.slug}`}>
                  <h5>{product.name}</h5>
                </Link>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
                <h4>₦ {product.price}</h4>
              </div>

              <Link to="/cart">
                <PiShoppingCartBold className="cartIcon" />
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
