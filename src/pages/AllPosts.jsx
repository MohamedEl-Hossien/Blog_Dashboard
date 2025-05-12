import PostsList from "../components/PostsList.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../util/requests.js";
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import ErrorBlock from "../components/ErrorBlock.jsx";

export default function AllPosts() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

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

  if (data) {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return (
    <div>
      <h1>All Posts</h1>
      <PostsList posts={data} />
    </div>
  );
}
