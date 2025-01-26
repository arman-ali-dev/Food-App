import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import { Cart } from "../components/Cart";
import axios from "axios";
import Cookies from "js-cookie";
import { setAuthUser } from "../redux/authSlice";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/users/logout", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      Cookies.remove("token");
      dispatch(setAuthUser(null));
      navigate("/login");
    } catch (error) {}
  };

  const handleCloseMenuBar = () => {
    setOpenMenu(false);
  };
  return (
    <>
      <header
        className={`d-flex align-items-center ${
          scrolled ? "bg-light bg-header" : "transparent-header"
        } ${
          (location.pathname === "/myOrder" ||
            location.pathname === "/login" ||
            location.pathname === "/signup") &&
          "bg-light bg-header"
        }`}
      >
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="logo">
              <Link
                onClick={handleCloseMenuBar}
                className="navbar-brand "
                to="/"
              >
                Food's Store
              </Link>
              <button
                onClick={() => setOpenMenu(true)}
                className="navbar-toggler "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span
                  className={`navbar-toggler-icon ${
                    scrolled ||
                    location.pathname === "/myOrder" ||
                    location.pathname === "/login" ||
                    location.pathname === "/signup"
                      ? "dark"
                      : "light"
                  }`}
                ></span>
              </button>
            </div>

            <div
              className={`collapse navbar-collapse ${openMenu && "show"}`}
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav w-full justify-content-between">
                <div className="d-lg-flex align-items-center">
                  <li className="nav-item mt-3 mt-lg-0">
                    <Link
                      onClick={handleCloseMenuBar}
                      activeclassname="active"
                      to="/"
                      className={`nav-link page ${
                        location.pathname === "/" && "activePage"
                      }`}
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>

                  {user && (
                    <li className="nav-item mt-3 mt-lg-0">
                      <Link
                        onClick={handleCloseMenuBar}
                        to="/myOrder"
                        className={`nav-link page ${
                          location.pathname === "/myOrder" && "activePage"
                        }`}
                        aria-current="page"
                      >
                        My Orders
                      </Link>
                    </li>
                  )}
                </div>

                <div className="d-lg-flex  align-items-center">
                  {!user ? (
                    <>
                      <li className="nav-item mt-3 mt-lg-0">
                        <Link
                          onClick={handleCloseMenuBar}
                          activeclassname="activePage"
                          to="/login"
                          className={`nav-link page ${
                            location.pathname === "/login" && "activePage"
                          }`}
                          aria-current="page"
                        >
                          Log In
                        </Link>
                      </li>

                      <li className="nav-item mt-3 mt-lg-0">
                        <Link
                          onClick={handleCloseMenuBar}
                          activeclassname="active"
                          to="/signup"
                          className={`nav-link page ${
                            location.pathname === "/signup" && "activePage"
                          }`}
                          aria-current="page"
                        >
                          Sign Up
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <div>
                        <li className="nav-item mt-3 mt-lg-0">
                          <Link
                            onClick={() => {
                              setShowCart(true);
                              handleCloseMenuBar();
                            }}
                            className="btn myOrderBtn btn  text-dark px-4 d-inline-block nav-link text-light"
                            aria-current="page"
                          >
                            Cart
                          </Link>
                        </li>
                        {showCart ? (
                          <Modal onClose={() => setShowCart(false)}>
                            <Cart />
                          </Modal>
                        ) : null}
                      </div>
                      <li className="nav-item mt-3 mt-lg-0">
                        <button
                          onClick={() => {
                            handleLogout();
                            handleCloseMenuBar();
                          }}
                          className="btn myOrderBtn btn text-dark px-4 d-inline-block nav-link text-light"
                          aria-current="page"
                        >
                          Log Out
                        </button>
                      </li>
                    </>
                  )}
                </div>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
