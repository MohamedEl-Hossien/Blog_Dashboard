import PostForm from "../components/PostForm.jsx";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPostByPostId } from "../util/requests.js";
import LoadingIndicator from "../components/LoadingIndicator.jsx";

export default function PostDetails() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userId = currentUser.uid;
  const param = useParams();
  const postId = param.postId;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetchPostByPostId({ userId, postId }),
    enabled: currentUser !== null,
  });

  if (!isLoggedIn) {
    return <Navigate to="/auth?mode=login" />;
  }

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch posts"}
      >
        {error.message}
      </ErrorBlock>
    );
  }

  if (data) {
    content = <PostForm post={data} />;
  }

  return <div>{content}</div>;
}
