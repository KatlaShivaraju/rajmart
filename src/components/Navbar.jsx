
import { useState } from "react";

import {
  Link,
  useNavigate,
  useLocation
}
from "react-router-dom";

import {

  FaShoppingCart,

  FaBox,

  FaUserCircle,

  FaSignOutAlt,

  FaBars,

  FaTimes,

  FaSearch,

  FaCrown

}
from "react-icons/fa";

function Navbar() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [menuOpen,
    setMenuOpen] =
    useState(false);

  const [search,
    setSearch] =
    useState("");

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const isAdmin =
    user?.role ===
    "ADMIN";

  // ======================
  // LOGOUT
  // ======================

  const handleLogout =
    () => {

      localStorage.removeItem(
        "user"
      );

      navigate("/");
    };

  // ======================
  // SEARCH
  // ======================

  const handleSearch =
    (e) => {

      e.preventDefault();

      if (
        search.trim()
      ) {

        navigate(
          `/home?search=${search}`
        );
      }
    };

  const navLink =
    (path) => ({

      color:

      location.pathname
      === path

      ?

      "#60a5fa"

      :

      "#d1d5db",

      textDecoration:
      "none",

      fontWeight:
      "500",

      transition:
      ".3s",

      fontSize:
      "15px"
    });

  return (

    <>

      {/* NAVBAR */}

      <nav
        style={{

          position:
          "sticky",

          top:
          "15px",

          zIndex:
          1000,

          margin:
          "0 auto",

          width:
          "95%",

          borderRadius:
          "28px",

          background:
          "rgba(255,255,255,0.08)",

          backdropFilter:
          "blur(20px)",

          border:
          "1px solid rgba(255,255,255,0.08)",

          boxShadow:
          "0 10px 40px rgba(0,0,0,0.25)",

          padding:
          "14px 28px"
        }}
      >

        <div
          style={{

            display:
            "flex",

            justifyContent:
            "space-between",

            alignItems:
            "center"
          }}
        >

          {/* LOGO */}

          <Link
            to="/home"
            style={{

              textDecoration:
              "none",

              display:
              "flex",

              alignItems:
              "center",

              gap:
              "10px"
            }}
          >

            <div
              style={{

                width:
                "42px",

                height:
                "42px",

                borderRadius:
                "14px",

                background:
                "linear-gradient(135deg,#2563eb,#3b82f6)",

                display:
                "flex",

                justifyContent:
                "center",

                alignItems:
                "center",

                color:
                "white",

                fontWeight:
                "700",

                fontSize:
                "18px"
              }}
            >
              R
            </div>

            <span
              style={{

                fontSize:
                "1.5rem",

                fontWeight:
                "800",

                color:
                "white"
              }}
            >
              RajMart
            </span>

          </Link>

          {/* DESKTOP MENU */}

          <div
            className="d-none d-lg-flex"
            style={{

              alignItems:
              "center",

              gap:
              "28px"
            }}
          >

            <Link
              to="/home"
              style={navLink("/home")}
            >
              Home
            </Link>

            

            <Link
              to="/cart"
              style={navLink("/cart")}
            >
              Cart
            </Link>

            <Link
              to="/orders"
              style={navLink("/MyOrders")}
            >
              Orders
            </Link>

            {

              isAdmin && (

                <Link
                  to="/admin"
                  style={navLink("/admin")}
                >

                  <FaCrown
                    style={{
                      marginRight:
                      "6px"
                    }}
                  />

                  Admin
                </Link>
              )
            }

          </div>

          {/* RIGHT SECTION */}

          <div
            className="d-none d-lg-flex"
            style={{

              alignItems:
              "center",

              gap:
              "14px"
            }}
          >

            {/* SEARCH */}

            <form
              onSubmit={
                handleSearch
              }
              style={{
                position:
                "relative"
              }}
            >

              <input
                type="text"

                placeholder=
                "Search..."

                value={
                  search
                }

                onChange={(e)=>

                  setSearch(
                    e.target.value
                  )
                }

                style={{

                  width:
                  "220px",

                  height:
                  "46px",

                  border:
                  "1px solid rgba(255,255,255,0.08)",

                  background:
                  "rgba(255,255,255,0.08)",

                  borderRadius:
                  "16px",

                  padding:
                  "0 45px 0 18px",

                  color:
                  "white",

                  outline:
                  "none"
                }}
              />

              <button
                type="submit"
                style={{

                  position:
                  "absolute",

                  right:
                  "14px",

                  top:
                  "50%",

                  transform:
                  "translateY(-50%)",

                  background:
                  "transparent",

                  border:
                  "none",

                  color:
                  "#60a5fa"
                }}
              >

                <FaSearch />

              </button>

            </form>

            {/* USER */}

            {

              user

              ?

              <>

                <Link
                  to="/cart"
                  style={{
                    color:
                    "#d1d5db"
                  }}
                >
                  <FaShoppingCart
                    size={20}
                  />
                </Link>

                <Link
                  to="/orders"
                  style={{
                    color:
                    "#d1d5db"
                  }}
                >
                  <FaBox
                    size={20}
                  />
                </Link>

                <button
                  onClick={
                    handleLogout
                  }

                  style={{

                    background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",

                    border:
                    "none",

                    color:
                    "white",

                    padding:
                    "10px 18px",

                    borderRadius:
                    "14px",

                    fontWeight:
                    "600",

                    cursor:
                    "pointer"
                  }}
                >

                  <FaSignOutAlt
                    style={{
                      marginRight:
                      "8px"
                    }}
                  />

                  Logout

                </button>

              </>

              :

              <Link
                to="/"
                style={{

                  background:
                  "linear-gradient(135deg,#2563eb,#3b82f6)",

                  color:
                  "white",

                  padding:
                  "10px 18px",

                  borderRadius:
                  "14px",

                  textDecoration:
                  "none",

                  fontWeight:
                  "600"
                }}
              >
                Login
              </Link>
            }

          </div>

          {/* MOBILE */}

          <button
            className="d-lg-none"
            onClick={()=>

              setMenuOpen(
                !menuOpen
              )
            }

            style={{

              background:
              "transparent",

              border:
              "none",

              color:
              "white"
            }}
          >

            {

              menuOpen

              ?

              <FaTimes size={24}/>

              :

              <FaBars size={24}/>
            }

          </button>

        </div>

        {/* MOBILE MENU */}

        {

          menuOpen && (

            <div
              className="d-lg-none mt-4"
              style={{

                display:
                "flex",

                flexDirection:
                "column",

                gap:
                "18px"
              }}
            >

              <Link
                to="/home"
                style={navLink("/home")}
              >
                Home
              </Link>

              <Link
                to="/products"
                style={navLink("/products")}
              >
                Products
              </Link>

              <Link
                to="/cart"
                style={navLink("/cart")}
              >
                Cart
              </Link>

              <Link
                to="/orders"
                style={navLink("/orders")}
              >
                Orders
              </Link>

              {

                isAdmin && (

                  <Link
                    to="/admin"
                    style={navLink("/admin")}
                  >
                    Admin
                  </Link>
                )
              }

              {

                user

                ?

                <button
                  onClick={
                    handleLogout
                  }
                  style={{

                    background:
                    "#2563eb",

                    border:
                    "none",

                    color:
                    "white",

                    borderRadius:
                    "14px",

                    padding:
                    "12px"
                  }}
                >
                  Logout
                </button>

                :

                <Link
                  to="/"
                  style={{
                    color:
                    "#60a5fa"
                  }}
                >
                  Login
                </Link>
              }

            </div>
          )
        }

      </nav>

    </>
  );
}

export default Navbar;
