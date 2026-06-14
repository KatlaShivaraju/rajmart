
import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle
} from "react-icons/fa";

import {

  registerUser,

  sendOtp,

  verifyOtp

}
from "../Services/authService";

function Register() {

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(false);

  const [otpSent,
    setOtpSent] =
    useState(false);

  const [verified,
    setVerified] =
    useState(false);

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [otp,
    setOtp] =
    useState("");

  const [formData,
    setFormData] =
    useState({

      name: "",

      email: "",

      password: ""
    });

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
        e.target.value
      });
    };

  // =====================
  // SEND OTP
  // =====================

  const handleSendOtp =
    async () => {

      if (
        !formData.email
      ) {

        alert(
          "Enter email first"
        );

        return;
      }

      try {

        setLoading(
          true
        );

        await sendOtp(
          formData.email
        );

        setOtpSent(
          true
        );

        alert(
          "OTP sent successfully"
        );

      } catch (error) {

        console.log(
          error
        );

        alert(
          error.response
          ?.data
          ||
          "Failed to send OTP"
        );

      } finally {

        setLoading(
          false
        );
      }
    };

  // =====================
  // VERIFY OTP
  // =====================

  const handleVerifyOtp =
    async () => {

      try {

        setLoading(
          true
        );

        await verifyOtp(

          formData.email,

          otp
        );

        setVerified(
          true
        );

      } catch (error) {

        console.log(
          error
        );

        alert(
          "Invalid OTP"
        );

      } finally {

        setLoading(
          false
        );
      }
    };

  // =====================
  // REGISTER
  // =====================

  const handleRegister =
    async (e) => {

      e.preventDefault();

      if (
        !verified
      ) {

        alert(
          "Verify email first"
        );

        return;
      }

      try {

        setLoading(
          true
        );

        await registerUser(
          formData
        );

        alert(
          "Registration Successful"
        );

        navigate(
          "/"
        );

      } catch (error) {

        console.log(
          error
        );

        alert(
          error.response
          ?.data
          ||
          "Registration Failed"
        );

      } finally {

        setLoading(
          false
        );
      }
    };

  return (

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

        position:
        "relative",

        overflow:
        "hidden",

        padding:
        "20px"
      }}
    >

      {/* BLUR */}

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
          "rgba(37,99,235,0.22)",

          filter:
          "blur(120px)",

          top:
          "-100px",

          left:
          "-100px"
        }}
      />

      <div
        style={{

          position:
          "absolute",

          width:
          "300px",

          height:
          "300px",

          borderRadius:
          "50%",

          background:
          "rgba(59,130,246,0.18)",

          filter:
          "blur(120px)",

          bottom:
          "-80px",

          right:
          "-80px"
        }}
      />

      {/* CARD */}

      <div
        style={{

          width:
          "100%",

          maxWidth:
          "480px",

          background:
          "rgba(255,255,255,0.08)",

          backdropFilter:
          "blur(25px)",

          border:
          "1px solid rgba(255,255,255,0.1)",

          borderRadius:
          "38px",

          padding:
          "45px",

          boxShadow:
          "0 25px 60px rgba(0,0,0,0.35)",

          zIndex:
          2
        }}
      >

        {/* HEADER */}

        <div
          style={{
            textAlign:
            "center",

            marginBottom:
            "30px"
          }}
        >

          <h1
            style={{

              color:
              "#fff",

              fontSize:
              "2.4rem",

              fontWeight:
              "800"
            }}
          >
            RajMart
          </h1>

          <p
            style={{
              color:
              "#94a3b8"
            }}
          >
            Create your premium
            shopping account.
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleRegister
          }
        >

          {/* NAME */}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* EMAIL + OTP */}

          <div
            style={{
              display:
              "flex",

              gap:
              "10px",

              marginTop:
              "18px"
            }}
          >

            <input
              type="email"
              name="email"
              placeholder=
              "Email Address"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
              style={{
                ...inputStyle,
                marginTop: 0
              }}
            />

            <button
              type="button"
              onClick={
                handleSendOtp
              }
              style={otpButton}
            >
              OTP
            </button>

          </div>

          {/* OTP FIELD */}

          {

            otpSent && (

              <div
                style={{
                  marginTop:
                  "18px"
                }}
              >

                <div
                  style={{

                    display:
                    "flex",

                    gap:
                    "10px"
                  }}
                >

                  <input
                    type="text"
                    placeholder=
                    "Enter OTP"
                    value={otp}
                    onChange={(e)=>

                      setOtp(
                        e.target.value
                      )
                    }
                    style={{
                      ...inputStyle,
                      marginTop: 0
                    }}
                  />

                  <button
                    type="button"
                    onClick={
                      handleVerifyOtp
                    }
                    style={otpButton}
                  >
                    Verify
                  </button>

                </div>

                {

                  verified && (

                    <div
                      style={{

                        color:
                        "#22c55e",

                        marginTop:
                        "12px",

                        display:
                        "flex",

                        alignItems:
                        "center",

                        gap:
                        "8px"
                      }}
                    >

                      <FaCheckCircle />

                      Email Verified

                    </div>
                  )
                }

              </div>
            )
          }

          {/* PASSWORD */}

          <div
            style={{
              position:
              "relative",

              marginTop:
              "18px"
            }}
          >

            <input
              type={
                showPassword
                ?

                "text"

                :

                "password"
              }

              name="password"

              placeholder=
              "Password"

              value={
                formData.password
              }

              onChange={
                handleChange
              }

              required

              style={{
                ...inputStyle,
                marginTop: 0
              }}
            />

            <button
              type="button"
              onClick={()=>

                setShowPassword(

                  !showPassword
                )
              }

              style={eyeButton}
            >

              {

                showPassword

                ?

                <FaEyeSlash />

                :

                <FaEye />
              }

            </button>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={
              loading
            }
            style={{
              ...loginButton,
              marginTop:
              "30px"
            }}
          >

            {

              loading

              ?

              "Creating Account..."

              :

              "Create Account"
            }

          </button>

        </form>

        <div
          style={{
            textAlign:
            "center",

            marginTop:
            "25px"
          }}
        >

          <span
            style={{
              color:
              "#94a3b8"
            }}
          >
            Already have
            an account?
          </span>

          {" "}

          <Link
            to="/"
            style={linkStyle}
          >
            Sign In
          </Link>

        </div>

      </div>

    </div>
  );
}

/* =====================
   STYLES
===================== */

const inputStyle = {

  width:
  "100%",

  height:
  "58px",

  borderRadius:
  "20px",

  border:
  "1px solid rgba(255,255,255,0.08)",

  background:
  "rgba(255,255,255,0.08)",

  color:
  "#ffffff",

  padding:
  "0 20px",

  fontSize:
  "1rem",

  outline:
  "none",

  marginTop:
  "18px"
};

const loginButton = {

  width:
  "100%",

  height:
  "58px",

  border:
  "none",

  borderRadius:
  "20px",

  background:
  "linear-gradient(135deg,#2563eb,#3b82f6)",

  color:
  "#fff",

  fontWeight:
  "600",

  fontSize:
  "1rem",

  cursor:
  "pointer",

  boxShadow:
  "0 12px 35px rgba(37,99,235,0.35)"
};

const otpButton = {

  minWidth:
  "95px",

  border:
  "none",

  borderRadius:
  "18px",

  background:
  "rgba(37,99,235,0.2)",

  color:
  "#60a5fa",

  fontWeight:
  "600",

  cursor:
  "pointer"
};

const eyeButton = {

  position:
  "absolute",

  top:
  "50%",

  right:
  "20px",

  transform:
  "translateY(-50%)",

  background:
  "transparent",

  border:
  "none",

  color:
  "#94a3b8",

  cursor:
  "pointer"
};

const linkStyle = {

  color:
  "#60a5fa",

  textDecoration:
  "none",

  fontWeight:
  "600"
};

export default Register;


