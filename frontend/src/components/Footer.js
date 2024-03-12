import React from "react";
import { Link } from "react-router-dom";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { LuInstagram } from "react-icons/lu";
import { TfiPinterestAlt } from "react-icons/tfi";
import { SiYoutube } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="section-p1">
      <div className="col">
        <Link to="/" className="logo">
          Belyswools
        </Link>
        <h4>Contact</h4>
        <p>
          <strong>Head Office:</strong> 56 University of Nigeria Road, Nsukka,
          Nigeria
        </p>
        <p>
          <strong>Phone:</strong> 09040266706/08100913619
        </p>
        <p>
          <strong>Hours:</strong> 24/7
        </p>

        <div className="follow">
          <h4>Follow us</h4>
          <div className="social-icons">
            <FaSquareFacebook className="sm-icons" />
            <FaSquareXTwitter className="sm-icons" />
            <LuInstagram className="sm-icons" />
            <TfiPinterestAlt className="sm-icons" />
            <SiYoutube className="sm-icons" />
          </div>
        </div>
      </div>

      <div className="col">
        <h4>About</h4>
        <Link to="/">About us</Link>
        <Link to="/">Delivery Information</Link>
        <Link to="/">Privacy Policy</Link>
        <Link to="/">Terms & Conditions</Link>
        <Link to="/">Contact Us</Link>
      </div>

      <div className="col">
        <h4>My Account</h4>
        <Link to="/">Sign In</Link>
        <Link to="/">View Cart</Link>
        <Link to="/">My Wishlist</Link>
        <Link to="/">Track My Order</Link>
        <Link to="/">Help</Link>
      </div>

      <div className="col install">
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
        <div className="row">
          <img src="/images/pay/app.jpg" alt="" />
          <img src="/images/pay/play.jpg" alt="" />
        </div>
        <p>Secured Payment Gateways </p>
        <img src="/images/pay/pay.png" alt="" />
      </div>

      <div className="copyright">
        <p>&copy; 2024, Koda-Black - Belly's WoolWorks</p>
      </div>
    </footer>
  );
};

export default Footer;
