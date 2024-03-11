import { Link } from "react-router-dom";

const Navbar = () => {
  //   const { logout } = useLogout();
  //   const { user } = useAuthContext();

  //   const handleClick = () => {
  //     logout();
  //   };

  return (
    <header id="header">
      <Link to="/" className="logo">
        Belyswools
      </Link>
      <nav>
        <ul id="navbar">
          <li>
            <Link to="/home" className="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>

          <li>
            <Link to="/blog">Blog</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
        {/* {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div className="">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          )} */}
      </nav>

      <div id="mobile">
        <a href="cart.html">
          <ion-icon name="bag-handle-outline"></ion-icon>
        </a>
        <ion-icon id="bar" name="menu"></ion-icon>
      </div>
    </header>
  );
};

export default Navbar;
