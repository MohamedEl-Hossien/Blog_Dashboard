import { NavLink } from "react-router-dom";
import classes from "./PostsNav.module.css";

export default function PostsNav() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Post
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
