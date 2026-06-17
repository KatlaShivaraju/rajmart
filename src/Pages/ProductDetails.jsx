
import {
  useEffect,
  useState
}
from "react";

import {
  useParams,
  useNavigate
}
from "react-router-dom";

import Navbar
from "../components/Navbar";

import {
  getProductById
}
from "../Services/productService";

import {
  addToCart
}
from "../Services/cartService";

function ProductDetails() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [product,
    setProduct] =
    useState(null);

  const [quantity,
    setQuantity] =
    useState(1);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  useEffect(() => {

    fetchProduct();

  }, []);

  // ======================
  // FETCH PRODUCT
  // ======================

  const fetchProduct =
    async () => {

      try {

        const response =
          await getProductById(
            id
          );

        setProduct(
          response.data
        );

      } catch (error) {

        console.log(
          error
        );
      }
    };

  // ======================
  // ADD TO CART
  // ======================

  const handleAddToCart =
    async () => {

      if (!user) {

        alert(
          "Login First"
        );

        navigate("/");
        return;
      }

      try {

        await addToCart(

          user.id,

          product.id,

          quantity
        );

        alert(
          "Added To Cart"
        );

      } catch (error) {

        console.log(
          error
        );

        alert(
          "Failed To Add"
        );
      }
    };

  // ======================
  // LOADING
  // ======================

  if (!product) {

    return (

      <>
        <Navbar />

        <div
          style={{

            minHeight:
            "100vh",

            background:
            "linear-gradient(135deg,#020617,#0f172a)",

            display:
            "flex",

            justifyContent:
            "center",

            alignItems:
            "center",

            color:
            "white",

            fontSize:
            "2rem"
          }}
        >
          Loading...
        </div>
      </>
    );
  }

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

          padding:
          "40px 20px 80px"
        }}
      >

        <div className="container">

          {/* BACK */}

          <button
            onClick={() =>
              navigate(-1)
            }

            style={{

              background:
              "rgba(255,255,255,0.08)",

              border:
              "1px solid rgba(255,255,255,0.08)",

              backdropFilter:
              "blur(20px)",

              color:
              "white",

              borderRadius:
              "20px",

              padding:
              "12px 22px",

              cursor:
              "pointer",

              marginBottom:
              "40px"
            }}
          >
            ← Back
          </button>

          <div
            className=
            "row align-items-center"
          >

            {/* IMAGE */}

            <div className="col-lg-6 mb-4">

              <div
                style={{

                  background:
                  "rgba(255,255,255,0.08)",

                  border:
                  "1px solid rgba(255,255,255,0.08)",

                  backdropFilter:
                  "blur(30px)",

                  borderRadius:
                  "40px",

                  padding:
                  "50px",

                  boxShadow:
                  "0 25px 60px rgba(0,0,0,0.35)"
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

                    maxHeight:
                    "550px",

                    objectFit:
                    "contain",

                    filter:
                    "drop-shadow(0 25px 50px rgba(37,99,235,0.35))"
                  }}
                />

              </div>

            </div>

            {/* DETAILS */}

            <div className="col-lg-6">

              <span
                style={{

                  background:
                  "rgba(37,99,235,0.15)",

                  color:
                  "#60a5fa",

                  padding:
                  "10px 18px",

                  borderRadius:
                  "30px",

                  fontWeight:
                  "600",

                  display:
                  "inline-block",

                  marginBottom:
                  "20px"
                }}
              >
                {
                  product
                  ?.category
                  ?.name
                }
              </span>

              <h1
                style={{

                  fontSize:
                  "4rem",

                  fontWeight:
                  "800",

                  marginBottom:
                  "10px"
                }}
              >
                {
                  product.name
                }
              </h1>

              <h4
                style={{
                  color:
                  "#94a3b8"
                }}
              >
                {
                  product.brand
                }
              </h4>

              <h2
                style={{

                  color:
                  "#60a5fa",

                  fontSize:
                  "3rem",

                  fontWeight:
                  "800",

                  marginTop:
                  "30px"
                }}
              >
                ₹
                {
                  product.price
                }
              </h2>

              <p
                style={{

                  color:
                  "#cbd5e1",

                  marginTop:
                  "30px",

                  lineHeight:
                  "2",

                  fontSize:
                  "1rem"
                }}
              >
                {
                  product.description
                }
              </p>

              {/* STOCK */}

              <div
                style={{
                  marginTop:
                  "35px"
                }}
              >

                <span
                  style={{

                    background:

                    product.available

                    ?

                    "rgba(34,197,94,0.15)"

                    :

                    "rgba(239,68,68,0.15)",

                    color:

                    product.available

                    ?

                    "#22c55e"

                    :

                    "#ef4444",

                    padding:
                    "12px 20px",

                    borderRadius:
                    "30px",

                    fontWeight:
                    "600"
                  }}
                >

                  {

                    product.available

                    ?

                    "✓ In Stock"

                    :

                    "✕ Out Of Stock"
                  }

                </span>

                <span
                  style={{

                    marginLeft:
                    "18px",

                    color:
                    "#94a3b8"
                  }}
                >
                  {
                    product.quantity
                  }
                  {" "}
                  items available
                </span>

              </div>

              {/* QUANTITY */}

              <div
                style={{
                  marginTop:
                  "40px"
                }}
              >

                <h5
                  style={{
                    marginBottom:
                    "18px"
                  }}
                >
                  Quantity
                </h5>

                <div
                  style={{

                    display:
                    "flex",

                    alignItems:
                    "center",

                    gap:
                    "18px",

                    width:
                    "fit-content",

                    background:
                    "rgba(255,255,255,0.08)",

                    border:
                    "1px solid rgba(255,255,255,0.08)",

                    borderRadius:
                    "22px",

                    padding:
                    "12px 18px"
                  }}
                >

                  <button
                    onClick={() =>

                      quantity > 1 &&

                      setQuantity(
                        quantity - 1
                      )
                    }

                    style={qtyBtn}
                  >
                    −
                  </button>

                  <span
                    style={{

                      fontSize:
                      "1.2rem",

                      fontWeight:
                      "700"
                    }}
                  >
                    {
                      quantity
                    }
                  </span>

                  <button
                    onClick={() =>

                      quantity <
                      product.quantity &&

                      setQuantity(
                        quantity + 1
                      )
                    }

                    style={qtyBtn}
                  >
                    +
                  </button>

                </div>

              </div>

              {/* BUTTONS */}

              <div
                className=
                "d-flex gap-3 mt-5"
              >

                <button
                  disabled={
                    !product.available
                  }

                  onClick={
                    handleAddToCart
                  }

                  style={{

                    ...primaryButton,

                    opacity:

                    !product.available

                    ?

                    .6

                    :

                    1
                  }}
                >
                  Add To Cart
                </button>

                <button
                  disabled={
                    !product.available
                  }

                  onClick={() =>
                    navigate(
                      "/checkout"
                    )
                  }

                  style={{

                    ...secondaryButton,

                    opacity:

                    !product.available

                    ?

                    .6

                    :

                    1
                  }}
                >
                  Buy Now
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

// ======================
// STYLES
// ======================

const qtyBtn = {

  width:
  "42px",

  height:
  "42px",

  border:
  "none",

  borderRadius:
  "14px",

  background:
  "rgba(37,99,235,0.2)",

  color:
  "white",

  fontSize:
  "22px",

  cursor:
  "pointer"
};

const primaryButton = {

  flex:
  1,

  border:
  "none",

  background:
  "linear-gradient(135deg,#2563eb,#3b82f6)",

  color:
  "white",

  padding:
  "18px",

  borderRadius:
  "22px",

  fontWeight:
  "700",

  cursor:
  "pointer",

  boxShadow:
  "0 12px 30px rgba(37,99,235,0.35)"
};

const secondaryButton = {

  flex:
  1,

  border:
  "1px solid rgba(255,255,255,0.1)",

  background:
  "rgba(255,255,255,0.08)",

  backdropFilter:
  "blur(20px)",

  color:
  "white",

  padding:
  "18px",

  borderRadius:
  "22px",

  fontWeight:
  "700",

  cursor:
  "pointer"
};

export default ProductDetails;
