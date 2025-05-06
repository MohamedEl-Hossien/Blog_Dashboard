import { Navigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";
import { getAuthToken } from "../firebase/auth.js";

export default function Login() {
  const token = getAuthToken();

  if (token !== null) {
    return <Navigate to="/posts" />;
  }

  return <AuthForm />;
}
