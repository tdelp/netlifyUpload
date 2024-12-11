import React from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../servs/Users";

const ProtectedRoute = ({ element: Component, isAuthenticated, ...rest }) => {
  const navigate = useNavigate();

  // redirect to register page if user is not authenticated
  const goBackHandler = () => {
    navigate("/register");
  };

  if (isAuthenticated || checkUser()) {
    
    return <Component {...rest} />;
  } else {
    // If not authenticated, prompt user to register
    return (
      <div>
        <p>Unauthorized! Please create an account to access this page.</p>
        <button onClick={goBackHandler}>Create an Account</button>
      </div>
    );
  }
};

export default ProtectedRoute;
