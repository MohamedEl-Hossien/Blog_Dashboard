import { Link } from "react-router-dom";
import classes from "./GetStarted.module.css";
import { useSelector } from "react-redux";
import LoadingIndicator from "./LoadingIndicator";

export default function GetStarted() {
  const isLoading = useSelector((state) => state.auth.loading);

  return (
    <>
      {!isLoading ? (
        <div className={classes.getStarted}>
          <h1>Welcome to the Blog Dashboard</h1>
          <p>
            Welcome to our blog! To get started, you can create a new post or
            explore existing ones. Use the navigation menu to find your way
            around.
          </p>
          <p>
            If you're new here, we recommend checking out our{" "}
            <Link className={classes.start} to="/posts">
              Posts
            </Link>{" "}
            section to see what others are writing about.
          </p>
        </div>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}
