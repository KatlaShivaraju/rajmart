
import {
  useEffect,
  useState
}
from "react";

import {
  useNavigate
}
from "react-router-dom";

import Navbar
from "./Navbar";

import logo
from "../assets/rajmart-logo.png";

import {
  getAllProducts
}
from "../Services/productService";

import {
  addToCart
}
from "../Services/cartService";

function Home() {

  const navigate =
    useNavigate();

  const [products,
    setProducts] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  // =====================
  // FETCH PRODUCTS
  // =====================

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts =
    async () => {

      try {

        const response =
          await getAllProducts();

        setProducts(

          Array.isArray(
            response.data
          )

          ?

          response.data

          :

          response.data.content
          || []
        );

      } catch (error) {

        console.log(
          error
        );

        setProducts([]);
      }
    };

  // =====================
  // ADD TO CART
  // =====================

  const handleAddToCart =
    async (
      e,
      productId
    ) => {

      e.stopPropagation();

      if (!user) {

        alert(
          "Please login first"
        );

        navigate("/");
        return;
      }

      try {

        await addToCart(

          user.id,

          productId,

          1
        );

        alert(
          "Added to cart"
        );

      } catch (error) {

        console.log(
          error
        );

        alert(
          "Failed to add to cart"
        );
      }
    };

  return (

    <>

      <Navbar />

      <div
        style={{

          minHeight:
          "100vh",

          background:
          "linear-gradient(135deg,#020617,#0f172a)",

          color:
          "white",

          paddingBottom:
          "80px"
        }}
      >

        {/* HERO */}

        <section
          style={{

            padding:
            "90px 20px",

            position:
            "relative",

            overflow:
            "hidden"
          }}
        >

          {/* BLUE GLOW */}

          <div
            style={{

              position:
              "absolute",

              width:
              "350px",

              height:
              "350px",

              borderRadius:
              "50%",

              background:
              "rgba(37,99,235,0.20)",

              filter:
              "blur(120px)",

              top:
              "-100px",

              left:
              "-100px"
            }}
          />

          <div className="container">

            <div
              className=
              "row align-items-center"
            >

              {/* LEFT */}

              <div className="col-lg-6">

                <span
                  style={{

                    background:
                    "rgba(37,99,235,0.18)",

                    color:
                    "#60a5fa",

                    padding:
                    "10px 18px",

                    borderRadius:
                    "50px",

                    fontWeight:
                    "600"
                  }}
                >
                  Premium Ecommerce
                </span>

                <h1
                  style={{

                    fontSize:
                    "4.5rem",

                    fontWeight:
                    "800",

                    marginTop:
                    "28px",

                    lineHeight:
                    "1.1"
                  }}
                >
                  Premium shopping
                  for modern life.
                </h1>

                <p
                  style={{

                    color:
                    "#94a3b8",

                    fontSize:
                    "1.15rem",

                    marginTop:
                    "20px",

                    maxWidth:
                    "550px"
                  }}
                >
                  Discover premium
                  electronics,
                  fashion and
                  lifestyle products
                  only on RajMart.
                </p>

              </div>

              {/* RIGHT */}

              <div
                className=
                "col-lg-6 text-center"
              >

                <img
                  src={logo}
                  alt="RajMart"

                  style={{

                    width:
                    "360px",

                    maxWidth:
                    "100%",

                    filter:
                    "drop-shadow(0 30px 60px rgba(37,99,235,0.35))"
                  }}
                />

              </div>

            </div>

          </div>

        </section>

        {/* PRODUCTS */}

        <div
          className=
          "container"
        >

          <div
            className=
            "d-flex justify-content-between align-items-center mb-4"
          >

            <h2
              style={{
                fontWeight:
                "800"
              }}
            >
              Featured Products
            </h2>

            <span
              style={{
                color:
                "#94a3b8"
              }}
            >
              {
                products.length
              }
              {" "}
              Products
            </span>

          </div>

          <div className="row">

            {

              Array.isArray(products)

              &&

              products.map(
                (
                  product
                ) => (

                <div
                  key={
                    product.id
                  }

                  className=
                  "col-lg-4 col-md-6 mb-4"
                >

                  <div

                    onClick={() =>
                      navigate(
                        `/product/${product.id}`
                      )
                    }

                    style={{

                      background:
                      "rgba(255,255,255,0.08)",

                      backdropFilter:
                      "blur(20px)",

                      border:
                      "1px solid rgba(255,255,255,0.08)",

                      borderRadius:
                      "34px",

                      padding:
                      "28px",

                      cursor:
                      "pointer",

                      transition:
                      ".3s",

                      height:
                      "100%",

                      boxShadow:
                      "0 15px 35px rgba(0,0,0,0.18)"
                    }}
                  >

                    <div
                      style={{

                        background:
                        "rgba(255,255,255,0.06)",

                        borderRadius:
                        "24px",

                        padding:
                        "25px"
                      }}
                    >

                      <img
                        src={`${import.meta.env.VITE_API_URL}/api/products/${product.id}/image`}

                        alt={
                          product.name
                        }

                        style={{

                          width:
                          "100%",

                          height:
                          "260px",

                          objectFit:
                          "contain"
                        }}
                      />

                    </div>

                    <h3
                      style={{

                        marginTop:
                        "20px",

                        fontWeight:
                        "700",

                        color:
                        "white"
                      }}
                    >
                      {
                        product.name
                      }
                    </h3>

                    <p
                      style={{
                        color:
                        "#94a3b8"
                      }}
                    >
                      {
                        product.brand
                      }
                    </p>

                    <h2
                      style={{

                        color:
                        "#60a5fa",

                        fontWeight:
                        "800"
                      }}
                    >
                      ₹
                      {
                        product.price
                      }
                    </h2>

                    <button
                      onClick={(e)=>

                        handleAddToCart(
                          e,
                          product.id
                        )
                      }

                      style={{

                        width:
                        "100%",

                        border:
                        "none",

                        background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)",

                        color:
                        "white",

                        padding:
                        "15px",

                        borderRadius:
                        "18px",

                        fontWeight:
                        "600",

                        marginTop:
                        "15px",

                        cursor:
                        "pointer"
                      }}
                    >
                      Add To Cart
                    </button>

                  </div>

                </div>
              ))
            }

          </div>

        </div>

      </div>

    </>
  );
}

export default Home;




