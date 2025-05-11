import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { authActions } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../firebase/auth.js";
import classes from "./MainNav.module.css";
import ErrorBlock from "./ErrorBlock.jsx";
import { useEffect, useState } from "react";

export default function MainNav() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation(); // Detect route changes

  // Hide navbar when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  function handleToggleNav() {
    setIsOpen((prevState) => !prevState);
  }

  const { mutate, isError, error } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      dispatch(authActions.clearUser());
      navigate("/auth?mode=login");
    },
  });

  if (isError) {
    return (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to Logout"}
      >
        {error.message}
      </ErrorBlock>
    );
  }

  function handleLogout(event) {
    event.preventDefault();
    mutate();
  }

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div className={classes.menuIcon} onClick={handleToggleNav}>
          &#9776;
        </div>
        <ul className={`${classes.navLinks}  ${isOpen ? classes.open : " "}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Dashboard
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Login
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
