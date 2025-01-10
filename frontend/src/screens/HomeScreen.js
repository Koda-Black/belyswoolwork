import { Link } from "react-router-dom";
import data from "../data";

import { PiShoppingCartBold } from "react-icons/pi";
import { AiFillStar } from "react-icons/ai";
import Product from "../components/Product";
import Newsletter from "../components/Newsletter";
import { Helmet } from "react-helmet-async";

export const HomeScreen = () => {
  return (
    <div>
      <Helmet>
        <title>Belyswoolwork | Home</title>
      </Helmet>
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
      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Summer Collection Top Design</p>
        <Product />
      </section>
      <section id="banner" className="section-m1">
        <h4>Trending wool pieces</h4>
        <h2>
          Up to<span> 50% off</span> - All fabrics & Accessories
        </h2>
        <button className="normal">Explore More</button>
      </section>

      <section id="product1" className="section-p1">
        <h2>New Arrivals</h2>
        <p>Trending Sales Collection for the Stylish</p>
        <div class="product__container">
          {data.newArrivals.map((newArrival) => (
            <div className="product" key={newArrival.slug}>
              <Link to={`/product/${newArrival.slug}`}>
                <img src={newArrival.image} alt={newArrival.name} />
              </Link>
              <div className="description">
                <span>{newArrival.brand}</span>
                <Link to={`/product/${newArrival.slug}`}>
                  <h5>{newArrival.name}</h5>
                </Link>
                <div className="star">
                  <AiFillStar className="starIcon" />
                  <AiFillStar className="starIcon" />
                  <AiFillStar className="starIcon" />
                  <AiFillStar className="starIcon" />
                  <AiFillStar className="starIcon" />
                </div>
                <h4>₦ {newArrival.price}</h4>
              </div>

              <Link to="/cart">
                <PiShoppingCartBold className="cartIcon" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="sm-banner" className="section-p1">
        <div className="banner__box">
          <h4>crazy deals</h4>
          <h2>buy 1 get 1 free</h2>
          <span>Only classic crochets are good enough at Belly's</span>
          <button className="white">Learn More</button>
        </div>

        <div className="banner__box banner__box2">
          <h4>harmattan/summer</h4>
          <h2>upcoming season</h2>
          <span>Only classic crochets are good enough at Belly's</span>
          <button className="white">Collection</button>
        </div>
      </section>

      <section id="banner3">
        <div className="banner__box">
          <h2>baby wears & Accessories</h2>
          <h3>Rainy Season Collection -50% OFF</h3>
        </div>

        <div className="banner__box  banner__box2">
          <h2>new footwear collection</h2>
          <h3>Harmattan/Summer 2022</h3>
        </div>

        <div className="banner__box banner__box3">
          <h2>new bags</h2>
          <h3>New Trendy Knittings</h3>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

import { Link } from "react-router-dom";
import data from "../data";

import { PiShoppingCartBold } from "react-icons/pi";
import { AiFillStar } from "react-icons/ai";
import Product from "../components/Product";
import Newsletter from "../components/Newsletter";
import { Helmet } from "react-helmet-async";

export const HomeScreen = () => {
  return (
    <div>
      <Helmet>
        <title>Belyswoolwork | Home</title>
      </Helmet>
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
      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Summer Collection Top Design</p>
        <Product />
      </section>
      <section id="banner" className="section-m1">
        <h4>Trending wool pieces</h4>
        <h2>
          Up to<span> 50% off</span> - All fabrics & Accessories
        </h2>
        <button className="normal">Explore More</button>
      </section>

      <section id="product1" className="section-p1">
        <h2>New Arrivals</h2>
        <p>Trending Sales Collection for the Stylish</p>
        <div class="product__container">
          {data.newArrivals.map((newArrival) => (
            <div className="product" key={newArrival.slug}>
              <Link to={`/product/${newArrival.slug}`}>
                <img src={newArrival.image} alt={newArrival.name} />
              </Link>
              <div className="description">
                <span>{newArrival.brand}</span>
                <Link to={`/product/${newArrival.slug}`}>
                  <h5>{newArrival.name}</h5>
                </Link>
                <div className="star">
                  <AiFillStar className="starIcon" />
                  <AiFillStar className="starIcon" />
                  <AiFillStar className="starIcon" />
                  <AiFillStar className="starIcon" />
                  <AiFillStar className="starIcon" />
                </div>
                <h4>₦ {newArrival.price}</h4>
              </div>

              <Link to="/cart">
                <PiShoppingCartBold className="cartIcon" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="sm-banner" className="section-p1">
        <div className="banner__box">
          <h4>crazy deals</h4>
          <h2>buy 1 get 1 free</h2>
          <span>Only classic crochets are good enough at Belly's</span>
          <button className="white">Learn More</button>
        </div>

        <div className="banner__box banner__box2">
          <h4>harmattan/summer</h4>
          <h2>upcoming season</h2>
          <span>Only classic crochets are good enough at Belly's</span>
          <button className="white">Collection</button>
        </div>
      </section>

      <section id="banner3">
        <div className="banner__box">
          <h2>baby wears & Accessories</h2>
          <h3>Rainy Season Collection -50% OFF</h3>
        </div>

        <div className="banner__box  banner__box2">
          <h2>new footwear collection</h2>
          <h3>Harmattan/Summer 2022</h3>
        </div>

        <div className="banner__box banner__box3">
          <h2>new bags</h2>
          <h3>New Trendy Knittings</h3>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};
