import { Outlet } from "react-router-dom";
import PostsNav from "../components/PostsNav.jsx";

export default function PostRoot() {
  return (
    <>
      <PostsNav />
      <Outlet />
    </>
  );
}
