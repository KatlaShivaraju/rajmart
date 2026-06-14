
import {
  useNavigate
} from "react-router-dom";

import Navbar
from "../components/Navbar";

import {

  FaBoxOpen,
  FaPlusCircle,
  FaShoppingCart,
  FaMoneyBillWave,
  FaUsers,
  FaChartLine

}
from "react-icons/fa";

import {
  FaArrowTrendUp
}
from "react-icons/fa6";

function AdminDashboard() {

  const navigate =
    useNavigate();

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

          {/* HERO */}

          <div
            style={{

              background:
              "rgba(255,255,255,0.06)",

              backdropFilter:
              "blur(30px)",

              border:
              "1px solid rgba(255,255,255,0.08)",

              borderRadius:
              "40px",

              padding:
              "50px",

              marginBottom:
              "40px",

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

                top:
                "-80px",

                right:
                "-80px",

                width:
                "250px",

                height:
                "250px",

                borderRadius:
                "50%",

                background:
                "rgba(37,99,235,0.25)",

                filter:
                "blur(100px)"
              }}
            />

            <div
              className=
              "d-flex justify-content-between align-items-center flex-wrap"
            >

              <div>

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
                  RajMart Admin
                </span>

                <h1
                  style={{

                    fontSize:
                    "3.5rem",

                    fontWeight:
                    "800",

                    marginTop:
                    "20px"
                  }}
                >
                  Dashboard
                </h1>

                <p
                  style={{
                    color:
                    "#94a3b8",

                    fontSize:
                    "1.1rem"
                  }}
                >
                  Manage products,
                  orders and store
                  performance.
                </p>

              </div>

              <div
                style={{

                  background:
                  "rgba(255,255,255,0.08)",

                  border:
                  "1px solid rgba(255,255,255,0.08)",

                  padding:
                  "25px",

                  borderRadius:
                  "30px",

                  textAlign:
                  "center",

                  minWidth:
                  "220px"
                }}
              >

                <FaChartLine
                  size={42}
                  color=
                  "#60a5fa"
                />

                <h3
                  style={{
                    marginTop:
                    "15px",

                    fontWeight:
                    "700"
                  }}
                >
                  Growth
                </h3>

                <h2
                  style={{
                    color:
                    "#60a5fa"
                  }}
                >
                  +28%
                </h2>

              </div>

            </div>

          </div>

          {/* STATS */}

          <div className="row g-4 mb-5">

            {/* PRODUCTS */}

            <div className="col-md-3">

              <div style={cardStyle}>

                <FaBoxOpen
                  size={42}
                  color=
                  "#60a5fa"
                />

                <h3
                  className=
                  "mt-3"
                >
                  Products
                </h3>

                <h1>25</h1>

              </div>

            </div>

            {/* ORDERS */}

            <div className="col-md-3">

              <div style={cardStyle}>

                <FaShoppingCart
                  size={42}
                  color=
                  "#22c55e"
                />

                <h3
                  className=
                  "mt-3"
                >
                  Orders
                </h3>

                <h1>120</h1>

              </div>

            </div>

            {/* REVENUE */}

            <div className="col-md-3">

              <div style={cardStyle}>

                <FaMoneyBillWave
                  size={42}
                  color=
                  "#f59e0b"
                />

                <h3
                  className=
                  "mt-3"
                >
                  Revenue
                </h3>

                <h1>₹50K</h1>

              </div>

            </div>

            {/* USERS */}

            <div className="col-md-3">

              <div style={cardStyle}>

                <FaUsers
                  size={42}
                  color=
                  "#ec4899"
                />

                <h3
                  className=
                  "mt-3"
                >
                  Users
                </h3>

                <h1>1.2K</h1>

              </div>

            </div>

          </div>

          {/* QUICK ACTIONS */}

          <div
            style={{

              background:
              "rgba(255,255,255,0.06)",

              backdropFilter:
              "blur(20px)",

              border:
              "1px solid rgba(255,255,255,0.08)",

              borderRadius:
              "40px",

              padding:
              "40px"
            }}
          >

            <h2
              style={{
                fontWeight:
                "800",

                marginBottom:
                "30px"
              }}
            >
              Quick Actions
            </h2>

            <div className="row g-4">

              {/* ADD PRODUCT */}

              <div className="col-md-6">

                <button
                  onClick={() =>
                    navigate(
                      "/add-product"
                    )
                  }

                  style={premiumBtn}
                >

                  <FaPlusCircle
                    className=
                    "me-2"
                  />

                  Add Product

                </button>

              </div>

              {/* MANAGE PRODUCTS */}

              <div className="col-md-6">

                <button
                  onClick={() =>
                    navigate(
                      "/admin-products"
                    )
                  }

                  style={glassBtn}
                >

                  <FaBoxOpen
                    className=
                    "me-2"
                  />

                  Manage Products

                </button>

              </div>

            </div>

          </div>

          {/* ANALYTICS */}

          <div className="row g-4 mt-4">

            <div className="col-lg-8">

              <div style={analyticsCard}>

                <div
                  className=
                  "d-flex justify-content-between"
                >

                  <h3>
                    Sales Overview
                  </h3>

                  <FaArrowTrendUp
                    size={28}
                    color=
                    "#60a5fa"
                  />

                </div>

                <div
                  style={{

                    height:
                    "220px",

                    display:
                    "flex",

                    justifyContent:
                    "center",

                    alignItems:
                    "center",

                    color:
                    "#94a3b8"
                  }}
                >
                  Analytics Coming Soon
                </div>

              </div>

            </div>

            <div className="col-lg-4">

              <div style={analyticsCard}>

                <h3>
                  Revenue Goal
                </h3>

                <h1
                  style={{
                    marginTop:
                    "20px",

                    color:
                    "#60a5fa"
                  }}
                >
                  72%
                </h1>

                <p
                  style={{
                    color:
                    "#94a3b8"
                  }}
                >
                  Monthly revenue
                  target achieved.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

// =====================
// STYLES
// =====================

const cardStyle = {

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

  textAlign:
  "center",

  boxShadow:
  "0 15px 35px rgba(0,0,0,0.2)"
};

const premiumBtn = {

  width:
  "100%",

  border:
  "none",

  background:
  "linear-gradient(135deg,#2563eb,#3b82f6)",

  color:
  "white",

  padding:
  "22px",

  borderRadius:
  "24px",

  fontWeight:
  "700",

  fontSize:
  "18px",

  cursor:
  "pointer",

  boxShadow:
  "0 12px 30px rgba(37,99,235,0.35)"
};

const glassBtn = {

  width:
  "100%",

  border:
  "1px solid rgba(255,255,255,0.08)",

  background:
  "rgba(255,255,255,0.08)",

  backdropFilter:
  "blur(20px)",

  color:
  "white",

  padding:
  "22px",

  borderRadius:
  "24px",

  fontWeight:
  "700",

  fontSize:
  "18px",

  cursor:
  "pointer"
};

const analyticsCard = {

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

  minHeight:
  "300px"
};

export default AdminDashboard;



