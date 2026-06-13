import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Services/authService";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

 const handleRegister = async () => {

  console.log(user);

  try {

    const response = await registerUser(user);

    alert(response.data);

    navigate("/");

  } catch (error) {
    console.log(error);
    alert("Registration Failed");
  }
};

  return (
    <div>
      <h1>Register Page</h1>

      <input
  type="text"
  name="name"
  placeholder="Enter Name"
  value={user.name}
  onChange={handleChange}
/>

      <br /><br />

      <input
  type="email"
  name="email"
  placeholder="Enter Email"
  value={user.email}
  onChange={handleChange}
/>

      <br /><br />

   <input
  type="password"
  name="password"
  placeholder="Enter Password"
  value={user.password}
  onChange={handleChange}
/>

      <br /><br />

      <button onClick={handleRegister}>
        Register
      </button>

      <p>
        Already have account?
        <Link to="/"> Login</Link>
      </p>
    </div>
  );
}

export default Register;