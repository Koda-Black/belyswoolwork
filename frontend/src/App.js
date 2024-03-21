import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { HomeScreen } from "./screens/HomeScreen";
import { ProductScreen } from "./screens/ProductScreen";
import { Shop } from "./screens/Shop";
import { Contact } from "./screens/Contact";
import { AboutScreen } from "./screens/AboutScreen";
import { CartScreen } from "./screens/CartScreen";
import { Blog } from "./screens/Blog";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import { SuccessfulScreen } from "./components/SuccessPaymentScreen";
import { CancelScreen } from "./components/CancelPaymentScreen";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      <div id="siteContainer">
        <Navbar />
        <main className="pages">
          <Routes>
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/payment/success" element={<SuccessfulScreen />} />
            <Route path="/payment/cancel" element={<CancelScreen />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
