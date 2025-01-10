import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";
import { FaTrash } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import { FaMinusCircle } from "react-icons/fa";
import { BsFillPlusCircleFill } from "react-icons/bs";

export const CartScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/v1/products/${item.id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
  };

  const checkoutHandler = () => {
    navigate("/signup?redirect=/shipping");
  };

  return (
    <>
      <section id="page__header" className="about__header">
        <Helmet>
          <title>Shopping Cart</title>
        </Helmet>
        <h2>#cart</h2>
        <p>Add your coupon code & SAVE up to 70%!</p>
      </section>

      <section id="cart" className="section-p1">
        <table width="100%">
          <thead>
            <tr>
              <td>Remove</td>
              <td>Image</td>
              <td>Product</td>
              <td>Price</td>
              <td>Quantity</td>
              {/* <td>Subtotal</td> */}
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <MessageBox>
                Cart is empty! <Link to="/">Go Shopping</Link>
              </MessageBox>
            ) : (
              cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Link to="/cart">
                      <FaTrash
                        onClick={() => removeItemHandler(item)}
                        style={{ color: "black" }}
                      />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/product/${item.slug}`}>
                      <img
                        src={`http://localhost:5202/public/uploads/${item.image}`}
                        alt={item.name}
                      />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                  </td>
                  <td>₦ {item.price}</td>
                  <td>
                    <button
                      className="cart-contronl-btn"
                      onClick={() => updateCartHandler(item, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      <FaMinusCircle />
                    </button>
                    {/* <input type="number" value="1" /> */}
                    <span> {item.quantity} </span>

                    <button
                      className="cart-contronl-btn"
                      onClick={() => updateCartHandler(item, item.quantity + 1)}
                      disabled={item.quantity === item.countInStock}
                    >
                      <BsFillPlusCircleFill />
                    </button>
                  </td>
                  {/* <td>₦ {item.price * item.quantity}</td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section id="cart-add" className="section-p1">
        <div id="coupon">
          <h3>Apply Coupon</h3>
          <div>
            <input type="text" placeholder="Enter Your Coupon" />
            <button className="normal">Apply</button>
          </div>
        </div>

        <div id="subTotal">
          <h3>Cart Totals</h3>
          <table>
            <tr>
              <td>Cart Subtotals</td>
              <td>
                ({cartItems.reduce((a, c) => a + c.quantity, 0)} items : ₦{" "}
                {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)})
              </td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>Free</td>
            </tr>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>
                  ₦ {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </strong>
              </td>
            </tr>
          </table>
          <button
            className="normal"
            disabled={cartItems.length === 0}
            onClick={() => checkoutHandler()}
          >
            Proceed to checkout
          </button>
        </div>
      </section>
    </>
  );
};
