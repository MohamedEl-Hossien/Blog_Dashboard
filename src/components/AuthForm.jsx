import classes from "./AuthForm.module.css";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logIn, signUp } from "../firebase/auth.js";
import { useMutation } from "@tanstack/react-query";
import { storeUserData } from "../util/requests.js";
import { signUpValidation, signInValidation } from "../util/validation.js";
import { ERROR_MESSAGES } from "../util/errorsMessages.js";
import LoadingIndicator from "./LoadingIndicator.jsx";
import Input from "./Input.jsx";

export default function AuthForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
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

  const handleAuth = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    let validationErrors;
    if (isLogin) {
      validationErrors = signInValidation(data);
    } else {
      validationErrors = signUpValidation(data);
    }

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      if (isLogin) {
        signInMutation.mutate({ data });
      } else {
        signUpMutation.mutate({ data });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <form onSubmit={handleAuth} className={classes.form}>
        <h2>{isLogin ? "Log in" : "Register"}</h2>
        <Input
          label="Email"
          name="email"
          type="email"
          error={errors?.email ?? null}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          error={errors?.password ?? null}
        />
        {!isLogin && (
          <>
            <Input
              label="User Name"
              name="name"
              type="text"
              error={errors?.name ?? null}
            />
            <Input
              label="Location"
              name="location"
              type="text"
              error={errors?.location ?? null}
            />
            <Input
              label="Position"
              name="position"
              type="text"
              error={errors?.position ?? null}
            />
            <Input
              label="Bio"
              name="bio"
              type="text"
              textArea
              rows={5}
              error={errors?.name ?? null}
            />
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
      {(signInMutation.isPending || signUpMutation.isPending) && (
        <>
          <p className={classes.loading}>
            {isLogin ? "Sign In......" : "Sign Up......"}{" "}
          </p>
          <LoadingIndicator />
        </>
      )}
      {signInMutation.isError && (
        <p className={classes.error}>
          {signInMutation.error.code
            ? ERROR_MESSAGES[signInMutation.error.code]
            : "Failed to login. An unknown error occurred."}
        </p>
      )}
      {signUpMutation.isError && (
        <p className={classes.error}>
          {signUpMutation.error.code
            ? ERROR_MESSAGES[signUpMutation.error.code]
            : "Failed to register. An unknown error occurred."}
        </p>
      )}
    </>
  );
}
