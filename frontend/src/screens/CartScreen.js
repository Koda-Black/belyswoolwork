import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const CartScreen = () => {
  return (
    <>
      <section id="page__header" className="about__header">
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
              <td>Subtotal</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="/">
                  <AiOutlineCloseCircle />
                </Link>
              </td>
              <td>
                <img src="/images/products/f1.jpg" alt="" />
              </td>
              <td>Cartoon Astronaut T-Shirts</td>
              <td>₦16,000</td>
              <td>
                <input type="number" value="1" />
              </td>
              <td>₦16,000</td>
            </tr>

            <tr>
              <td>
                <Link to="/">
                  <AiOutlineCloseCircle />
                </Link>
              </td>
              <td>
                <img src="/images/products/f2.jpg" alt="" />
              </td>
              <td>Cartoon Astronaut T-Shirts</td>
              <td>₦16,000</td>
              <td>
                <input type="number" value="1" />
              </td>
              <td>₦16,000</td>
            </tr>

            <tr>
              <td>
                <Link to="/">
                  <AiOutlineCloseCircle />
                </Link>
              </td>
              <td>
                <img src="/images/products/f3.jpg" alt="" />
              </td>
              <td>Cartoon Astronaut T-Shirts</td>
              <td>₦16,000</td>
              <td>
                <input type="number" value="1" />
              </td>
              <td>₦16,000</td>
            </tr>
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
              <td>₦48,000.00</td>
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
                <strong>₦48,000.00</strong>
              </td>
            </tr>
          </table>
          <button className="normal">Proceed to checkout</button>
        </div>
      </section>
    </>
  );
};
