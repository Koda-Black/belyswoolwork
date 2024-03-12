import { Link } from "react-router-dom";
import { IoBagHandleOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { RiMenu3Fill } from "react-icons/ri";

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
            <Link to="/" className="active">
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
            <Link to="/cart">
              <IoBagHandleOutline id="lg-bag" style={{ fontSize: 20 }} />
            </Link>
          </li>

          <div id="close">
            <AiOutlineClose />
          </div>
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
        <Link to="/cart" className="mobile-cart">
          <IoBagHandleOutline />
        </Link>
        <RiMenu3Fill id="bar" />
      </div>
    </header>
  );
};

export default Navbar;
