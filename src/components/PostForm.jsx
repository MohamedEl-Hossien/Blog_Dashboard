import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./PostForm.module.css";
import { useSelector } from "react-redux";
import { createNewPost, updatePost, queryClient } from "../util/requests.js";
import LoadingIndicator from "./LoadingIndicator.jsx";
import ErrorBlock from "./ErrorBlock.jsx";

export default function PostForm({ method, post }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userId = currentUser.uid;
  const param = useParams();
  const postId = param.postId;

  const navigate = useNavigate();

  function cancelHandler() {
    navigate("/dashboard");
  }

  const createNewPostMutation = useMutation({
    mutationFn: createNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/dashboard");
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/dashboard");
    },
  });

  function handleSubmitNew(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    createNewPostMutation.mutate({ userId, data });
  }

  function handleSubmitUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    updatePostMutation.mutate({ userId, postId, data });
  }

  return (
    <>
      <form
        className={classes.form}
        onSubmit={method === "new" ? handleSubmitNew : handleSubmitUpdate}
      >
        <div className={classes.control}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={post ? post.title : ""}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            required
            defaultValue={post ? post.author : ""}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            defaultValue={post ? post.date : ""}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            rows={5}
            required
            defaultValue={post ? post.content : ""}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button type="submit" className={classes.submit}>
            {method === "new" ? "Create Post" : "Update Post"}
          </button>
          <button
            type="button"
            className={classes.cancel}
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </form>
      {createNewPostMutation.isLoading && (
        <>
          <p className={classes.loading}> Creating Post......</p>
          <LoadingIndicator />
        </>
      )}
      {createNewPostMutation.isError && (
        <ErrorBlock
          title="An error occurred"
          message={
            createNewPostMutation.error.info?.message || "Failed to create post"
          }
        ></ErrorBlock>
      )}
      {updatePostMutation.isLoading && (
        <>
          <p className={classes.loading}>Updating post...</p>
          <LoadingIndicator />
        </>
      )}
      {updatePostMutation.isError && (
        <ErrorBlock
          title="An error occurred"
          message={
            createNewPostMutation.error.info?.message || "Failed to update post"
          }
        ></ErrorBlock>
      )}
    </>
  );
}
