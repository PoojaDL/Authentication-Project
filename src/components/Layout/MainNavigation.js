import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext, useEffect } from "react";
import AuthContext from "../../Store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    {
      console.log(authCtx);
    }
  }, [authCtx.isLoggedIn]);

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <button>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
