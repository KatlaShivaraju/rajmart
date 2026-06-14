import {
  Navigate
} from "react-router-dom";

function ProtectedRoute({

  children,

  adminOnly = false
}) {

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  // NOT LOGGED IN

  if (!user) {

    return (
      <Navigate
        to="/"
      />
    );
  }

  // ADMIN CHECK

  if (
    adminOnly
    &&
    user.role
    !== "ADMIN"
  ) {

    return (
      <Navigate
        to="/home"
      />
    );
  }

  return children;
}

export default ProtectedRoute;