import React, { useState } from "react";
import { loginUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const AuthLogin = ({ setIsAuthenticated }) => {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const userLoggedIn = await loginUser(currentUser);
      if (userLoggedIn) {
        setSuccess("Login successful! You can now access other features.");
        setError(null); // clear any previous error
        localStorage.setItem("isAuthenticated", "true"); // setting authentication to true for access to Species page
        setIsAuthenticated(true); // update authentication state 
        navigate("/"); // redirect to the home page
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div>
      <AuthForm
        user={currentUser}
        isLogin={true}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AuthLogin;

