import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { IoBagHandleOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { RiMenu3Fill } from "react-icons/ri";
import { useContext } from "react";
import { Store } from "../Store";

const Navbar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
  };

  return (
    <header id="header">
      <Link to="/" className="logo">
        Belyswools
      </Link>
      <nav>
        <ul id="navbar">
          <li>
            <Link to="/" className="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>

          <li className="user-profile">
            {userInfo ? (
              <NavDropdown title={userInfo.user.name} id="basic-nav-dropdown">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>

          <li>
            <Link to="/cart">
              <IoBagHandleOutline id="lg-bag" style={{ fontSize: 20 }} />
              {cart.cartItems.length > 0 && (
                <span className="cart-count">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
            </Link>
          </li>

          <div id="close">
            <AiOutlineClose />
          </div>
        </ul>
      </nav>

      <div id="mobile">
        <Link to="/cart" className="mobile-cart">
          <IoBagHandleOutline />
          {cart.cartItems.length > 0 && (
            <span className="cart-count">
              {" "}
              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </span>
          )}
        </Link>
        <RiMenu3Fill id="bar" />
      </div>
    </header>
  );
};

export default Navbar;
