import { useSelector } from "react-redux";
import classes from "./PostsList.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient, deletePost } from "../util/requests";

export default function PostsList({ posts, from }) {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/dashboard");
    },
  });

  function handleDeletePost(postId) {
    const userId = currentUser.uid;
    const response = window.confirm("Are you Sure To Delte This Post");
    if (response) {
      mutate({ userId, postId });
    }
  }

  return (
    <>
      {posts && posts.length > 0 ? (
        <div className={classes.postsContainer}>
          {posts.map((post) => {
            return (
              <div className={classes.post} key={post.groupKey}>
                <div className={classes.postHeader}>
                  <h2>{post.title}</h2>
                  <p className={classes.author}>Author: {post.author}</p>
                  <p className={classes.date}>
                    Date: {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
                <p className={classes.content}>{post.content}</p>
                <div className={classes.actions}>
                  {isLoggedIn && from === "dashboard" && (
                    <>
                      <Link
                        className={classes.edit}
                        to={`/dashboard/${post.groupKey}/edit`}
                      >
                        Edit
                      </Link>
                      <button
                        className={classes.delete}
                        onClick={() => {
                          handleDeletePost(post.groupKey);
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className={classes.emptyPosts}> No Posts Available</p>
      )}
    </>
  );
}
