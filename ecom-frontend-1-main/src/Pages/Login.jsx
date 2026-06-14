
import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import {
  loginUser
} from "../Services/authService";

function Login() {

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(false);

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [formData,
    setFormData] =
    useState({

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

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const response =
          await loginUser(
            formData
          );

        const user =
          response.data;

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        if (
          user.role ===
          "ADMIN"
        ) {

          navigate(
            "/admin"
          );

        } else {

          navigate(
            "/home"
          );
        }

      } catch (error) {

        console.log(
          error
        );

        alert(
          error.response
          ?.data ||
          "Invalid credentials"
        );

      } finally {

        setLoading(false);
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

      {/* BLUR EFFECT */}

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
          "460px",

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
            "35px"
          }}
        >

          <h1
            style={{

              color:
              "#fff",

              fontSize:
              "2.4rem",

              fontWeight:
              "800",

              marginBottom:
              "8px"
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
            Welcome back.
            Sign in to continue.
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleLogin
          }
        >

          {/* EMAIL */}

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
              "#fff",

              padding:
              "0 20px",

              fontSize:
              "1rem",

              outline:
              "none",

              marginBottom:
              "18px"
            }}
          />

          {/* PASSWORD */}

          <div
            style={{
              position:
              "relative",

              marginBottom:
              "28px"
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
                "#fff",

                padding:
                "0 20px",

                fontSize:
                "1rem",

                outline:
                "none"
              }}
            />

            <button
              type="button"

              onClick={() =>

                setShowPassword(

                  !showPassword
                )
              }

              style={{

                position:
                "absolute",

                right:
                "20px",

                top:
                "50%",

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
              }}
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

              fontSize:
              "1rem",

              fontWeight:
              "600",

              cursor:
              "pointer",

              boxShadow:
              "0 12px 35px rgba(37,99,235,0.35)"
            }}
          >

            {

              loading

              ?

              "Signing In..."

              :

              "Sign In"
            }

          </button>

        </form>

        {/* FOOTER */}

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
            New to RajMart?
          </span>

          {" "}

          <Link
            to="/register"

            style={{

              color:
              "#60a5fa",

              textDecoration:
              "none",

              fontWeight:
              "600"
            }}
          >
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;


