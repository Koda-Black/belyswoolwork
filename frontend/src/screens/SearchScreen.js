import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { getError } from "../utils";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Row, Col, Button } from "react-bootstrap";
import { Rating } from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { FaRegTimesCircle } from "react-icons/fa";
import Product from "../components/Product";
import { LinkContainer } from "react-router-bootstrap";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        countPages: action.payload.countPages,
      };
    case "FETCH_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const prices = [
  {
    name: "₦1000 to ₦5000",
    value: "1000-5000",
  },
  {
    name: "₦5000 to ₦25000",
    value: "5000-25000",
  },
  {
    name: "₦25000 to ₦125000",
    value: "25000-125000",
  },
];

export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },
  {
    name: "3stars & up",
    rating: 3,
  },
  {
    name: "2stars & up",
    rating: 2,
  },
  {
    name: "1stars & up",
    rating: 1,
  },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams();
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
      products: [],
      pages: 0,
      countPages: 0,
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/v1/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;

    return `${
      skipPathname ? "" : "/search"
    }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order${sortOrder}&page=${filterPage}`;
  };

  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <div className="section-p1">
        <Row>
          <Col md={3}>
            <h3>Department</h3>
            <div>
              <ul>
                <li>
                  <Link
                    className={"all" === category ? "text-bold" : ""}
                    to={getFilterUrl({ category: "all" })}
                  >
                    Any
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? "text-bold" : ""}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Price</h3>
              <ul>
                <li>
                  <Link
                    className={"all" === price ? "text-bold" : ""}
                    to={getFilterUrl({ price: "all" })}
                  >
                    Any
                  </Link>
                </li>
                <li>
                  {prices.map((p) => (
                    <li key={p.value}>
                      <Link
                        to={getFilterUrl({ price: p.value })}
                        className={p.value === price ? "text-bold" : ""}
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </li>
              </ul>
            </div>
            <div>
              <h3>Avg. Customer Review</h3>
              <ul>
                {ratings.map((r) => (
                  <li key={r.name}>
                    <Link
                      to={getFilterUrl({ rating: r.rating })}
                      className={
                        `${r.rating}` === `${rating}` ? "text-bold" : ""
                      }
                    >
                      <Rating caption={" & up"} rating={r.rating}></Rating>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to={getFilterUrl({ rating: "all" })}
                    className={rating === "all" ? "text-bold" : ""}
                  >
                    <Rating caption={" & up"} rating={0}></Rating>
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={9}>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                <Row className="justify-content-between mb-3">
                  <Col md={6}>
                    <div>
                      {countProducts === 0 ? "No" : countProducts} Results
                      {query !== "all" && " : " + query}
                      {category !== "all" && " : " + category}
                      {price !== "all" && " : Price " + price}
                      {rating !== "all" && " : Rating " + rating + " & up"}
                      {query !== "all" ||
                      category !== "all" ||
                      price !== "all" ||
                      rating !== "all" ? (
                        <Button
                          variant="light"
                          onClick={() => navigate("/search")}
                        >
                          <FaRegTimesCircle />
                        </Button>
                      ) : null}
                    </div>
                  </Col>
                  <Col className="text-end">
                    Sort by{" "}
                    <select
                      value={order}
                      onChange={(e) => {
                        navigate(getFilterUrl({ order: e.target.value }));
                      }}
                    >
                      <option value="newest"> New Arrivals </option>
                      <option value="lowest"> Price: Low to High </option>
                      <option value="highest"> Price: High to Low </option>
                      <option value="toprated"> Avg. Customer Reviews </option>
                    </select>
                  </Col>
                </Row>
                {products.length === 0 && (
                  <MessageBox>No Product Found</MessageBox>
                )}
                <Row>
                  {products.map((product) => (
                    <Col sm={6} lg={4} className="mb-3" key={product.id}>
                      <Product product={product}></Product>
                    </Col>
                  ))}
                </Row>

                <div>
                  {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                      key={x + 1}
                      className="mx-1"
                      to={{
                        pathname: "/search",
                        search: getFilterUrl({ page: x + 1 }, true),
                      }}
                    >
                      <Button
                        className={Number(page) === x + 1 ? "text-bold" : ""}
                        variant="light"
                      >
                        {x + 1}
                      </Button>
                    </LinkContainer>
                  ))}
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}
