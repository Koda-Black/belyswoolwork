import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import { IoBagHandleOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { RiMenu3Fill } from "react-icons/ri";
import { useContext, useState, useEffect } from "react";
import { Store } from "../Store";
import { getError } from "../utils";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/login";
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/v1/categories`);
        setCategories(data.categories.name);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <div
      className={
        sidebarIsOpen
          ? "d-flex flex-column site-Container active-cont"
          : "d-flex flex-column site-container"
      }
    >
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
                <NavDropdown
                  title={userInfo?.user?.name}
                  id="basic-nav-dropdown"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="/signout"
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

            <Button
              variant="light"
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <RiMenu3Fill id="bar" />
            </Button>
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
        </div>
      </header>
      <div
        className={
          sidebarIsOpen
            ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
            : "side-navbar d-flex justify-content-between flex-wrap flex-column"
        }
      >
        <Nav className="flex-column text-white w-100 p-2">
          <Nav.Item>
            <strong> Categories</strong>
          </Nav.Item>
          {categories.map((category) => (
            <Nav.Item key={category}>
              <LinkContainer
                to={`/search?category=${category}`}
                onClick={() => setSidebarIsOpen(false)}
              >
                <Nav.Link>{category}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Navbar;
