import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
// import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import { IoBagHandleOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { useContext, useState, useEffect } from "react";
import { Store } from "./Store";
import { getError } from "./utils";
import { toast } from "react-toastify";
import axios from "axios";
import { FaBars } from "react-icons/fa6";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreens from "./screens/DashboardScreens";
import AdminRoute from "./components/AdminRoute";

function App() {
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
        const { data } = await axios.get(`/api/v1/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? "d-flex flex-column site-container active-cont"
            : "d-flex flex-column site-container"
        }
      >
        <ToastContainer position="bottom-center" limit={1} />

        <header id="header">
          <div className="logo-menu">
            <Button
              variant="light"
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <FaBars id="bar" />
            </Button>

            <Link to="/" className="logo">
              Belyswools
            </Link>
          </div>

          <nav>
            <ul id="navbar">
              <SearchBox />
              <li>
                <Link to="/" className="active">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              {/* <li>
                <Link to="/about">About</Link>
              </li> */}

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
                {userInfo && userInfo.user.isAdmin && (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
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
                  to={{ pathname: "/search", search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        <div id="siteContainer">
          <main className="pages">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/payment/success" element={<SuccessfulScreen />} />
              <Route path="/payment/cancel" element={<CancelScreen />} />
              <Route path="/contact" element={<Contact />} />
              {/* <Route path="/about" element={<AboutScreen />} /> */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/shop" element={<Shop />} />

              {/* Admin Routes*/}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreens />
                  </AdminRoute>
                }
              />

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
// import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import { IoBagHandleOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { useContext, useState, useEffect } from "react";
import { Store } from "./Store";
import { getError } from "./utils";
import { toast } from "react-toastify";
import axios from "axios";
import { FaBars } from "react-icons/fa6";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreens from "./screens/DashboardScreens";
import AdminRoute from "./components/AdminRoute";

function App() {
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
        const { data } = await axios.get(`/api/v1/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? "d-flex flex-column site-container active-cont"
            : "d-flex flex-column site-container"
        }
      >
        <ToastContainer position="bottom-center" limit={1} />

        <header id="header">
          <div className="logo-menu">
            <Button
              variant="light"
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <FaBars id="bar" />
            </Button>

            <Link to="/" className="logo">
              Belyswools
            </Link>
          </div>

          <nav>
            <ul id="navbar">
              <SearchBox />
              <li>
                <Link to="/" className="active">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              {/* <li>
                <Link to="/about">About</Link>
              </li> */}

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
                {userInfo && userInfo.user.isAdmin && (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
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
                  to={{ pathname: "/search", search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        <div id="siteContainer">
          <main className="pages">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/payment/success" element={<SuccessfulScreen />} />
              <Route path="/payment/cancel" element={<CancelScreen />} />
              <Route path="/contact" element={<Contact />} />
              {/* <Route path="/about" element={<AboutScreen />} /> */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/shop" element={<Shop />} />

              {/* Admin Routes*/}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreens />
                  </AdminRoute>
                }
              />

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
