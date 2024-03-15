import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

import data from "../data";
import Newsletter from "../components/Newsletter";
import { Rating } from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "./MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";
import Product from "../components/Product";

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
  const navigate = useNavigate();
  const { slug } = useParams();

  const [quantity, setQuantity] = useState(1);

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
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.product });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  function handleSizes(e) {
    setQuantity(e.target.value);
  }

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/v1/products/${product.id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  return (
    <>
      {loading ? (
        <div>
          <LoadingBox />
        </div>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
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
            {product.countInStock > 0 ? (
              <div className="productBadge success">In Stock</div>
            ) : (
              <div className="productBadge failure">Out of Stock</div>
            )}
            <h6>Home / {product.category.name}</h6>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h4>{product.name}</h4>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <h2>₦ {product.price}</h2>
            <select>
              <option>Select Size</option>
              <option>XL</option>
              <option>XXL</option>
              <option>Small</option>
              <option>Large</option>
              <option>XLarge</option>
            </select>
            <input type="number" value={quantity} onChange={handleSizes} />
            <button className="normal" onClick={addToCartHandler}>
              Add To Cart
            </button>
            <h4>Product Details</h4>
            <span>
              {product.richDescription}
              {/* The Gildan Ultra Cotton T-shirt is made from a substantial 6.0 oz.
              per sq. yd. fabric constructed from 100% cotton, this classNameic
              fit preshrunk jersey knit provides unmatched comfort with each
              wear. Featuring a taped neck and shoulder, and a seamless
              double-needle collar, and available in a range of colors, it
              offers it all in the ultimate head-turning package. */}
            </span>
          </div>
        </section>
      )}
      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Trending Sales Collection for the Stylish</p>
        <Product products={data.products} limits={4} />
      </section>
      <Newsletter />
    </>
  );
};
