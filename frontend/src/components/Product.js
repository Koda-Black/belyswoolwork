import React, { useReducer } from "react";
import { useEffect, useContext } from "react";
// import logger from "use-reducer-logger";
import axios from "axios";
import { Link } from "react-router-dom";
import { PiShoppingCartBold } from "react-icons/pi";
import { Rating } from "./Rating";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { getError } from "../utils";
import { toast } from "react-toastify";
import { Store } from "../Store";

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

const Product = (props) => {
  const { limits, product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x.id === item.id); // Update here
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/v1/products/${item.id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
    toast.success("Item Added To Cart Successfully");
  };

  const [{ loading, error, productList }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    productList: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/v1/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.productList });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="product__container">
      {loading ? (
        <div>
          <LoadingBox />
        </div>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        productList.slice(0, limits).map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img
                src={`http://localhost:5202/public/uploads/${product.image}`}
                // src={product.image}
                alt={product.name}
              />
            </Link>
            <div className="description">
              <span>{product.brand}</span>
              <Link to={`/product/${product.slug}`}>
                <h5>{product.name}</h5>
              </Link>
              <Rating
                id="rating"
                rating={product.rating}
                numReviews={product.numReviews}
              />
              <h4>₦ {product.price}</h4>
            </div>

            <Link to="/">
              <PiShoppingCartBold
                className="cartIcon"
                onClick={() => addToCartHandler(product)}
              />
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Product;

import React, { useReducer } from "react";
import { useEffect, useContext } from "react";
// import logger from "use-reducer-logger";
import axios from "axios";
import { Link } from "react-router-dom";
import { PiShoppingCartBold } from "react-icons/pi";
import { Rating } from "./Rating";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { getError } from "../utils";
import { toast } from "react-toastify";
import { Store } from "../Store";

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

const Product = (props) => {
  const { limits, product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x.id === item.id); // Update here
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/v1/products/${item.id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
    toast.success("Item Added To Cart Successfully");
  };

  const [{ loading, error, productList }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    productList: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/v1/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.productList });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="product__container">
      {loading ? (
        <div>
          <LoadingBox />
        </div>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        productList.slice(0, limits).map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img
                src={`http://localhost:5202/public/uploads/${product.image}`}
                // src={product.image}
                alt={product.name}
              />
            </Link>
            <div className="description">
              <span>{product.brand}</span>
              <Link to={`/product/${product.slug}`}>
                <h5>{product.name}</h5>
              </Link>
              <Rating
                id="rating"
                rating={product.rating}
                numReviews={product.numReviews}
              />
              <h4>₦ {product.price}</h4>
            </div>

            <Link to="/">
              <PiShoppingCartBold
                className="cartIcon"
                onClick={() => addToCartHandler(product)}
              />
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Product;
