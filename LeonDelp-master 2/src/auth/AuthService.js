import Parse from "parse";

// Register a new user
export const createUser = (newUser) => {
  const user = new Parse.User();
  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
      return null;
    });
};

// Log in a user
export const loginUser = ({ email, password }) => {
  return Parse.User.logIn(email, password)
    .then((user) => {
      return user;
    })
    .catch((error) => {
      alert(`Login error: ${error.message}`);
      return null;
    });
};

// Check if a user is currently authenticated
export const checkUser = () => {
  const currentUser = Parse.User.current();
  return currentUser && currentUser.authenticated();
};
