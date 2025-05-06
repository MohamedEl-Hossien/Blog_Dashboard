import { Navigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { useSelector } from "react-redux";

export default function NewPost() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  if (!isLoggedIn) {
    return <Navigate to="/auth?mode=login" />;
  }

  return <PostForm method="new" />;
}
