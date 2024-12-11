import React, { useState } from "react";
import { createUser } from "./AuthService";
import AuthForm from "./AuthForm";

const AuthRegister = () => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const userCreated = await createUser(newUser);
      if (userCreated) {
        setSuccess("Registration successful! Please log in using the login page.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div>
      <AuthForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default AuthRegister;
