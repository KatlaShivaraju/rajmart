import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Services/authService.js";

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {

    try {

      const response = await loginUser(user);

      alert(response.data);

      navigate("/home");

    } catch (error) {

      alert(
        error.response?.data ||
        "Login Failed"
      );
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
      <br /><br />

<Link to="/home">
  <button>
    Go To Home
  </button>
</Link>

      <p>
        Don't have account?
        <Link to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}



export default Login;