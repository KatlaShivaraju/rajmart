
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
from "../components/Navbar";

import {

  getCart,

  removeCartItem,

  updateCartQuantity

}
from "../Services/cartService";

import {

  FaTrash,

  FaMinus,

  FaPlus,

  FaShoppingCart

}
from "react-icons/fa";

function Cart() {

  const navigate =
    useNavigate();

  const [cartItems,
    setCartItems] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  useEffect(() => {

    if (!user) {

      navigate("/");
      return;
    }

    fetchCart();

  }, []);

  // ======================
  // FETCH CART
  // ======================

  const fetchCart =
    async () => {

      try {

        const response =
          await getCart(
            user.id
          );

        setCartItems(
          response.data || []
        );

      } catch (error) {

        console.log(
          error
        );
      }
    };

  // ======================
  // REMOVE ITEM
  // ======================

  const handleRemove =
    async (id) => {

      try {

        await removeCartItem(
          id
        );

        fetchCart();

      } catch (error) {

        console.log(
          error
        );
      }
    };

  // ======================
  // UPDATE QUANTITY
  // ======================

  const handleQuantity =
    async (
      cartId,
      quantity
    ) => {

      if (
        quantity < 1
      ) return;

      try {

        await updateCartQuantity(

          cartId,
          quantity
        );

        fetchCart();

      } catch (error) {

        console.log(
          error
        );
      }
    };

  // ======================
  // TOTAL
  // ======================

  const subtotal =
    cartItems.reduce(

      (
        total,
        item
      ) =>

        total +

        (
          item.product.price *
          item.quantity
        ),

      0
    );

  const gst =
    subtotal * 0.18;

  const delivery =
    subtotal > 1000
    ? 0
    : 50;

  const total =
    subtotal +
    gst +
    delivery;

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

          {/* HEADER */}

          <div
            className=
            "d-flex align-items-center justify-content-between mb-5"
          >

            <h1
              style={{

                fontSize:
                "3rem",

                fontWeight:
                "800"
              }}
            >
              My Cart
            </h1>

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
                "600"
              }}
            >
              {
                cartItems.length
              }
              {" "}
              Items
            </span>

          </div>

          {

            cartItems.length
            === 0

            ?

            (

              <div
                style={{

                  textAlign:
                  "center",

                  padding:
                  "120px 20px"
                }}
              >

                <FaShoppingCart
                  size={90}
                  color=
                  "#60a5fa"
                />

                <h2
                  style={{
                    marginTop:
                    "25px"
                  }}
                >
                  Your cart is empty
                </h2>

                <p
                  style={{
                    color:
                    "#94a3b8"
                  }}
                >
                  Add premium
                  products to continue.
                </p>

                <button
                  onClick={() =>
                    navigate(
                      "/home"
                    )
                  }

                  style={{

                    border:
                    "none",

                    background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",

                    color:
                    "white",

                    padding:
                    "15px 28px",

                    borderRadius:
                    "18px",

                    marginTop:
                    "20px",

                    fontWeight:
                    "600",

                    cursor:
                    "pointer"
                  }}
                >
                  Continue Shopping
                </button>

              </div>

            )

            :

            (

              <div className="row">

                {/* LEFT */}

                <div className="col-lg-8">

                  {

                    cartItems.map(
                      (
                        item
                      ) => (

                      <div
                        key={
                          item.id
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
                          "25px",

                          marginBottom:
                          "25px",

                          boxShadow:
                          "0 15px 35px rgba(0,0,0,0.2)"
                        }}
                      >

                        <div
                          className=
                          "row align-items-center"
                        >

                          {/* IMAGE */}

                          <div
                            className=
                            "col-md-3 text-center"
                          >

                            <img
                              src={`${import.meta.env.VITE_API_URL}/api/products/${item.product.id}/image`}

                              alt={
                                item.product.name
                              }

                              style={{

                                width:
                                "100%",

                                maxHeight:
                                "140px",

                                objectFit:
                                "contain"
                              }}
                            />

                          </div>

                          {/* INFO */}

                          <div className="col-md-5">

                            <h4
                              style={{
                                fontWeight:
                                "700"
                              }}
                            >
                              {
                                item.product.name
                              }
                            </h4>

                            <p
                              style={{
                                color:
                                "#94a3b8"
                              }}
                            >
                              {
                                item.product.brand
                              }
                            </p>

                            <h4
                              style={{
                                color:
                                "#60a5fa"
                              }}
                            >
                              ₹
                              {
                                item.product.price
                              }
                            </h4>

                          </div>

                          {/* QUANTITY */}

                          <div className="col-md-2">

                            <div
                              style={{

                                display:
                                "flex",

                                alignItems:
                                "center",

                                justifyContent:
                                "center",

                                gap:
                                "12px",

                                background:
                                "rgba(255,255,255,0.08)",

                                borderRadius:
                                "18px",

                                padding:
                                "12px"
                              }}
                            >

                              <button
                                onClick={() =>
                                  handleQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }

                                style={qtyBtn}
                              >
                                <FaMinus />
                              </button>

                              <span
                                style={{
                                  fontWeight:
                                  "700"
                                }}
                              >
                                {
                                  item.quantity
                                }
                              </span>

                              <button
                                onClick={() =>
                                  handleQuantity(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }

                                style={qtyBtn}
                              >
                                <FaPlus />
                              </button>

                            </div>

                          </div>

                          {/* DELETE */}

                          <div
                            className=
                            "col-md-2 text-center"
                          >

                            <button
                              onClick={() =>
                                handleRemove(
                                  item.id
                                )
                              }

                              style={deleteBtn}
                            >

                              <FaTrash />

                            </button>

                          </div>

                        </div>

                      </div>
                    ))
                  }

                </div>

                {/* RIGHT */}

                <div className="col-lg-4">

                  <div
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
                      "35px",

                      position:
                      "sticky",

                      top:
                      "110px",

                      boxShadow:
                      "0 15px 35px rgba(0,0,0,0.2)"
                    }}
                  >

                    <h3
                      style={{
                        fontWeight:
                        "700"
                      }}
                    >
                      Order Summary
                    </h3>

                    <div className="mt-4">

                      <SummaryRow
                        label=
                        "Subtotal"
                        value=
                        {subtotal}
                      />

                      <SummaryRow
                        label=
                        "GST (18%)"
                        value=
                        {gst}
                      />

                      <SummaryRow
                        label=
                        "Delivery"
                        value=
                        {delivery}
                      />

                    </div>

                    <hr
                      style={{
                        borderColor:
                        "rgba(255,255,255,0.1)"
                      }}
                    />

                    <div
                      className=
                      "d-flex justify-content-between"
                    >

                      <h4>
                        Total
                      </h4>

                      <h4
                        style={{
                          color:
                          "#60a5fa"
                        }}
                      >
                        ₹
                        {
                          total.toFixed(2)
                        }
                      </h4>

                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          "/checkout"
                        )
                      }

                      style={checkoutBtn}
                    >
                      Proceed To Checkout
                    </button>

                  </div>

                </div>

              </div>

            )
          }

        </div>

      </div>

    </>
  );
}

// ======================
// STYLES
// ======================

const qtyBtn = {

  border:
  "none",

  background:
  "rgba(37,99,235,0.2)",

  color:
  "white",

  width:
  "34px",

  height:
  "34px",

  borderRadius:
  "10px",

  cursor:
  "pointer"
};

const deleteBtn = {

  border:
  "none",

  background:
  "rgba(239,68,68,0.15)",

  color:
  "#ef4444",

  width:
  "50px",

  height:
  "50px",

  borderRadius:
  "16px",

  cursor:
  "pointer"
};

const checkoutBtn = {

  width:
  "100%",

  marginTop:
  "28px",

  border:
  "none",

  background:
  "linear-gradient(135deg,#2563eb,#3b82f6)",

  color:
  "white",

  padding:
  "16px",

  borderRadius:
  "20px",

  fontWeight:
  "700",

  cursor:
  "pointer"
};

function SummaryRow({
  label,
  value
}) {

  return (

    <div
      className=
      "d-flex justify-content-between mb-3"
    >

      <span
        style={{
          color:
          "#94a3b8"
        }}
      >
        {label}
      </span>

      <span>
        ₹
        {
          value.toFixed(2)
        }
      </span>

    </div>
  );
}

export default Cart;

