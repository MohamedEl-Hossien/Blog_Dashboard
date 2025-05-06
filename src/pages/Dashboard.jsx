import { useSelector } from "react-redux";
import ProfileInfo from "../components/ProfileInfo";
import { Navigate } from "react-router-dom";
import PostsList from "../components/PostsList";
import { useQuery } from "@tanstack/react-query";
import { fetchPostsByUserId } from "../util/requests";
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import ErrorBlock from "../components/ErrorBlock.jsx";

export default function Dashboard() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", currentUser?.uid],
    queryFn: () => fetchPostsByUserId({ userId: currentUser?.uid }),
    enabled: isLoggedIn,
  });

  if (!isLoggedIn) {
    return <Navigate to="/auth?mode=login" />;
  }

  if (isPending) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch posts"}
      >
        {error.message}
      </ErrorBlock>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <ProfileInfo />
      <h2>Your Posts</h2>
      <PostsList posts={data} from="dashboard" />
    </div>
  );
}
