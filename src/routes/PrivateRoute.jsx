import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // const user_uid = localStorage.getItem("user_uid");
  const isAuthenticated = token && token !== "undefined" && token !== "null";
  // const isAuthenticatedtwo = user_uid && token !== "undefined" && token !== "null";
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default PrivateRoute;




// Other way
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
// import { useEffect } from "react";

// const PrivateRoute = ({ children }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//     }
//   }, [token, navigate]);

//   return token ? children : null;
// };

// PrivateRoute.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default PrivateRoute;

