
import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import Navbar
from "../components/Navbar";

import {
  getOrders
}
from "../Services/OrderService";

import {
  FaBoxOpen,
  FaShoppingBag
} from "react-icons/fa";

function MyOrders() {

  const navigate =
    useNavigate();

  const [orders,
    setOrders] =
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

    fetchOrders();

  }, []);

  // ======================
  // FETCH ORDERS
  // ======================

  const fetchOrders =
    async () => {

      try {

        const response =
          await getOrders(
            user.id
          );

        console.log(
          "Orders API:",
          response.data
        );

        const orderData =

          Array.isArray(
            response.data
          )

          ?

          response.data

          :

          response.data?.content
          || [];

        setOrders(
          orderData
        );

      } catch (error) {

        console.log(
          error
        );

        setOrders([]);
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

          padding:
          "40px 20px 80px"
        }}
      >

        <div className="container">

          {/* HEADER */}

          <div className="mb-5">

            <h1
              style={{

                fontSize:
                "3rem",

                fontWeight:
                "800"
              }}
            >
              My Orders
            </h1>

            <p
              style={{
                color:
                "#94a3b8"
              }}
            >
              Track your RajMart
              purchases.
            </p>

          </div>

          {

            !orders ||

            orders.length
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

                <FaShoppingBag
                  size={90}
                  color=
                  "#60a5fa"
                />

                <h2
                  style={{
                    marginTop:
                    "20px"
                  }}
                >
                  No Orders Yet
                </h2>

                <p
                  style={{
                    color:
                    "#94a3b8"
                  }}
                >
                  Your purchases
                  will appear here.
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
                    "14px 24px",

                    borderRadius:
                    "18px",

                    fontWeight:
                    "600",

                    cursor:
                    "pointer",

                    marginTop:
                    "20px"
                  }}
                >
                  Shop Now
                </button>

              </div>

            )

            :

            (

              <div className="row">

                {

                  orders.map(
                    (
                      order
                    ) => (

                    <div
                      key={
                        order.id
                      }

                      className=
                      "col-lg-6 mb-4"
                    >

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
                          "30px",

                          boxShadow:
                          "0 15px 35px rgba(0,0,0,0.2)"
                        }}
                      >

                        {/* TOP */}

                        <div
                          className=
                          "d-flex justify-content-between align-items-center mb-4"
                        >

                          <div
                            className=
                            "d-flex align-items-center"
                          >

                            <div
                              style={{

                                width:
                                "65px",

                                height:
                                "65px",

                                borderRadius:
                                "20px",

                                background:
                                "rgba(37,99,235,0.15)",

                                display:
                                "flex",

                                justifyContent:
                                "center",

                                alignItems:
                                "center",

                                marginRight:
                                "16px"
                              }}
                            >

                              <FaBoxOpen
                                size={26}
                                color=
                                "#60a5fa"
                              />

                            </div>

                            <div>

                              <h5
                                style={{
                                  fontWeight:
                                  "700"
                                }}
                              >
                                Order #
                                {
                                  order.id
                                }
                              </h5>

                              <span
                                style={{
                                  color:
                                  "#94a3b8"
                                }}
                              >
                                {
                                  order.orderDate
                                  || "N/A"
                                }
                              </span>

                            </div>

                          </div>

                          <span
                            style={{

                              background:
                              "rgba(34,197,94,0.15)",

                              color:
                              "#22c55e",

                              padding:
                              "10px 18px",

                              borderRadius:
                              "30px",

                              fontWeight:
                              "600"
                            }}
                          >
                            Ordered
                          </span>

                        </div>

                        <hr
                          style={{
                            borderColor:
                            "rgba(255,255,255,0.1)"
                          }}
                        />

                        {/* DETAILS */}

                        <div className="mt-4">

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
                              Total Amount
                            </span>

                            <strong
                              style={{
                                color:
                                "#60a5fa"
                              }}
                            >
                              ₹
                              {
                                order.totalAmount
                                || 0
                              }
                            </strong>

                          </div>

                          <div
                            className=
                            "d-flex justify-content-between"
                          >

                            <span
                              style={{
                                color:
                                "#94a3b8"
                              }}
                            >
                              Status
                            </span>

                            <strong>
                              Paid
                            </strong>

                          </div>

                        </div>

                      </div>

                    </div>
                  ))
                }

              </div>

            )
          }

        </div>

      </div>

    </>
  );
}

export default MyOrders;



