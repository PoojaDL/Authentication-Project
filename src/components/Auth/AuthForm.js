import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import AuthContext from "../../Store/auth-context";

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
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

    setLoad(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8wHsJTe8rHFeXPPHA5u0R9NWkWsuix3s";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8wHsJTe8rHFeXPPHA5u0R9NWkWsuix3s";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailEntered,
        password: passwordEntered,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoad(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => authCtx.login(data.idToken))
      .catch((error) => alert(error));
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
          {load ? (
            <p style={{ color: "white" }}>Sending request...</p>
          ) : (
            <button>{isLogin ? "Login" : "Create account"}</button>
          )}

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
