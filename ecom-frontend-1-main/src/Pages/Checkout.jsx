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
  getCart
}
from "../Services/cartService";

import {
  createOrder
}
from "../Services/PaymentService";

import {
  placeOrder
}
from "../Services/OrderService";

import {
  FaCreditCard,
  FaMoneyCheckAlt,
  FaUniversity,
  FaTruck
}
from "react-icons/fa";

function Checkout() {

  const navigate =
    useNavigate();

  const [cartItems,
    setCartItems] =
    useState([]);

  const [selectedPayment,
    setSelectedPayment] =
    useState("UPI");

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

  const fetchCart =
    async () => {

      try {

        const response =
          await getCart(
            user.id
          );

        setCartItems(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  // =====================
  // CALCULATIONS
  // =====================

  const subtotal =
    cartItems.reduce(

      (
        total,
        item
      ) =>

        total +
        item.product.price *
        item.quantity,

      0
    );

  const gst =
    subtotal * 0.18;

  const deliveryFee =
    subtotal > 1000
      ? 0
      : 50;

  const grandTotal =
    subtotal +
    gst +
    deliveryFee;

  // =====================
  // PAYMENT
  // =====================

  const handlePayment =
    async () => {

      try {

        const order =
          await createOrder(
            grandTotal
          );

        const options = {

          key:
          "rzp_test_T1Vpf0UlgIRBgD",

          amount:
          order.amount,

          currency:
          "INR",

          name:
          "RajMart",

          description:
          "Order Payment",

          order_id:
          order.id,

          handler:
          async function () {

            await placeOrder(
              user.id
            );

            alert(
              "Payment Successful"
            );

            navigate(
              "/my-orders"
            );
          },

          prefill: {

            name:
            user.name,

            email:
            user.email
          },

          theme: {
            color:
            "#0071e3"
          }
        };

        const razorpay =

          new window
            .Razorpay(
              options
            );

        razorpay.open();

      } catch (error) {

        console.log(error);

        alert(
          "Payment Failed"
        );
      }
    };

  return (

    <>

      <Navbar />

      <div
        className=
        "container py-5"
      >

        <div className="row g-5">

          {/* LEFT */}

          <div className="col-lg-7">

            <h1
              style={{

                fontWeight:
                "700",

                fontSize:
                "3rem",

                marginBottom:
                "35px"
              }}
            >
              Checkout
            </h1>

            {/* SHIPPING */}

            <div
              className=
              "mb-4"
              style={{

                background:
                "#fff",

                borderRadius:
                "30px",

                padding:
                "30px",

                boxShadow:
                "0 8px 30px rgba(0,0,0,0.06)"
              }}
            >

              <h4
                className=
                "mb-3"
              >
                Shipping Details
              </h4>

              <p
                style={{
                  color:
                  "#6e6e73"
                }}
              >
                Delivering to:
              </p>

              <h5>
                {user?.name}
              </h5>

              <p
                style={{
                  color:
                  "#6e6e73"
                }}
              >
                {user?.email}
              </p>

              <div
                className=
                "d-flex align-items-center mt-3"
              >

                <FaTruck
                  className=
                  "me-2"
                  color=
                  "#0071e3"
                />

                <span>
                  Free delivery
                  in 2–4 days
                </span>

              </div>

            </div>

            {/* PAYMENT METHODS */}

            <div
              style={{

                background:
                "#fff",

                borderRadius:
                "30px",

                padding:
                "30px",

                boxShadow:
                "0 8px 30px rgba(0,0,0,0.06)"
              }}
            >

              <h4
                className=
                "mb-4"
              >
                Payment Method
              </h4>

              <div className="row g-3">

                {[
                  {
                    name:
                    "UPI",

                    icon:
                    <FaMoneyCheckAlt />
                  },

                  {
                    name:
                    "Card",

                    icon:
                    <FaCreditCard />
                  },

                  {
                    name:
                    "Net Banking",

                    icon:
                    <FaUniversity />
                  }
                ].map(
                  (
                    item
                  ) => (

                  <div
                    key={
                      item.name
                    }
                    className=
                    "col-md-4"
                  >

                    <div
                      onClick={() =>
                        setSelectedPayment(
                          item.name
                        )
                      }
                      style={{

                        cursor:
                        "pointer",

                        border:
                        selectedPayment
                        === item.name

                        ? "2px solid #0071e3"

                        : "1px solid #e5e5e5",

                        borderRadius:
                        "25px",

                        padding:
                        "25px",

                        textAlign:
                        "center",

                        background:
                        selectedPayment
                        === item.name

                        ? "#f5f9ff"

                        : "#fff",

                        transition:
                        "0.3s"
                      }}
                    >

                      <div
                        style={{
                          fontSize:
                          "28px",

                          marginBottom:
                          "10px"
                        }}
                      >
                        {
                          item.icon
                        }
                      </div>

                      <h6>
                        {
                          item.name
                        }
                      </h6>

                    </div>

                  </div>
                ))
                }

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="col-lg-5">

            <div
              style={{

                background:
                "#fff",

                borderRadius:
                "35px",

                padding:
                "35px",

                boxShadow:
                "0 8px 30px rgba(0,0,0,0.08)",

                position:
                "sticky",

                top:
                "100px"
              }}
            >

              <h3
                className=
                "mb-4"
              >
                Order Summary
              </h3>

              {
                cartItems.map(
                  (
                    item
                  ) => (

                  <div
                    key={
                      item.id
                    }
                    className=
                    "d-flex justify-content-between mb-3"
                  >

                    <div>

                      <h6>
                        {
                          item.product
                            .name
                        }
                      </h6>

                      <small
                        style={{
                          color:
                          "#6e6e73"
                        }}
                      >
                        Qty:
                        {" "}
                        {
                          item.quantity
                        }
                      </small>

                    </div>

                    <span>
                      ₹
                      {
                        item.product
                        .price *
                        item.quantity
                      }
                    </span>

                  </div>
                ))
              }

              <hr />

              <div
                className=
                "d-flex justify-content-between mb-2"
              >
                <span>
                  Subtotal
                </span>

                <span>
                  ₹
                  {
                    subtotal
                    .toFixed(2)
                  }
                </span>
              </div>

              <div
                className=
                "d-flex justify-content-between mb-2"
              >
                <span>
                  GST (18%)
                </span>

                <span>
                  ₹
                  {
                    gst
                    .toFixed(2)
                  }
                </span>
              </div>

              <div
                className=
                "d-flex justify-content-between mb-3"
              >
                <span>
                  Delivery
                </span>

                <span>
                  ₹
                  {
                    deliveryFee
                  }
                </span>
              </div>

              <hr />

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
                    "#0071e3",

                    fontWeight:
                    "700"
                  }}
                >
                  ₹
                  {
                    grandTotal
                    .toFixed(2)
                  }
                </h4>

              </div>

              <button
                className=
                "btn w-100 mt-4"
                onClick={
                  handlePayment
                }
                style={{

                  background:
                  "#0071e3",

                  color:
                  "white",

                  borderRadius:
                  "50px",

                  padding:
                  "16px",

                  fontWeight:
                  "600",

                  border:
                  "none",

                  fontSize:
                  "18px"
                }}
              >
                Pay ₹
                {
                  grandTotal
                  .toFixed(0)
                }
              </button>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default Checkout;