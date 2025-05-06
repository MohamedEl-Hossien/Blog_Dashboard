import classes from "./AuthForm.module.css";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { logIn, signUp } from "../firebase/auth.js";
// import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { storeUserData } from "../util/requests.js";
import LoadingIndicator from "./LoadingIndicator.jsx";

export default function AuthForm() {
  const navigate = useNavigate();
  // const imagePicker = useRef();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (authResult, data) => {
      const filteredData = { ...data.data };
      delete filteredData.password;
      const userId = authResult.user.uid;
      storeUserDataMutation.mutate({ userId, filteredData });
    },
  });

  const signInMutation = useMutation({
    mutationFn: logIn,
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const storeUserDataMutation = useMutation({
    mutationFn: storeUserData,
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    signInMutation.mutate({ data });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    signUpMutation.mutate({ data });
  };

  // const hadleUploadImage = async (event) => {
  //   event.preventDefault();
  //   imagePicker.current.click();
  // };

  return (
    <>
      <form
        onSubmit={isLogin ? handleLogin : handleSignUp}
        className={classes.form}
      >
        <h2>{isLogin ? "Log in" : "Register"}</h2>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </div>
        {!isLogin && (
          <>
            <div className={classes.control}>
              <label htmlFor="name">User Name</label>
              <input id="name" type="text" name="name" required />
            </div>
            <div className={classes.control}>
              <label htmlFor="location">Location</label>
              <input id="location" type="text" name="location" required />
            </div>
            <div className={classes.control}>
              <label htmlFor="position">Position</label>
              <input id="position" type="text" name="position" required />
            </div>
            <div className={classes.control}>
              <label htmlFor="bio">Bio</label>
              <textarea id="bio" name="bio" rows={5} required></textarea>
            </div>
            {/* <div className={classes.control}>
            <input
              type="file"
              name="image"
              ref={imagePicker}
              style={{ display: "none" }}
            />
            <button onClick={hadleUploadImage}>Upload Image</button>
          </div> */}
          </>
        )}
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Register" : "Login"}
          </Link>
          <button disabled={signUpMutation.isPending}>
            {signUpMutation.isPending
              ? "Submitting..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </div>
      </form>
      {signInMutation.isPending && (
        <>
          <p className={classes.loading}> Sign In......</p>
          <LoadingIndicator />
        </>
      )}
      {signInMutation.isError && (
        <p className={classes.error}>
          {signInMutation.error.info?.message ||
            "Failed to login. Please check your inputs and try again later."}
        </p>
      )}
      {signUpMutation.isPending && (
        <>
          <p className={classes.loading}> Sign Up......</p>
          <LoadingIndicator />
        </>
      )}
      {signUpMutation.isError && (
        <p className={classes.error}>
          {signUpMutation.error.info?.message ||
            "Failed to register. Please check your inputs and try again later."}
        </p>
      )}
    </>
  );
}
