import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  // const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);

  const emailInput = useRef();
  const passwordInput = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const emailEntered = emailInput.current.value;
    const passwordEntered = passwordInput.current.value;

    if (isLogin) {
    } else {
      setLoad(true);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8wHsJTe8rHFeXPPHA5u0R9NWkWsuix3s",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailEntered,
            password: passwordEntered,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setLoad(false);
        if (res.ok) {
          console.log(res);
        } else {
          return res.json().then((data) => {
            // setError(true);
            alert(data.error.message);
          });
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInput} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInput} />
        </div>
        <div className={classes.actions}>
          {load && <p>Sending request</p>}
          <button>{isLogin ? "Login" : "Create account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
