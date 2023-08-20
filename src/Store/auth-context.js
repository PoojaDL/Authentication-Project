import { useState } from "react";
import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  let initialItem = localStorage.getItem("token");
  const [token, setToken] = useState(initialItem);
  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const tokenValues = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logOutHandler,
  };

  return (
    <AuthContext.Provider value={tokenValues}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
