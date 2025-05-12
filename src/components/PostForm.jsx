import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createNewPost, updatePost, queryClient } from "../util/requests.js";
import { postValidation } from "../util/validation.js";
import LoadingIndicator from "./LoadingIndicator.jsx";
import ErrorBlock from "./ErrorBlock.jsx";
import classes from "./PostForm.module.css";

export default function PostForm({ method, post }) {
  const [errors, setErrors] = useState({});

  const currentUser = useSelector((state) => state.auth.currentUser);
  const userId = currentUser.uid;

  const param = useParams();
  const postId = param.postId;

  const navigate = useNavigate();

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // "YYYY-MM-DD"

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

  function handleSubmitPost(event, method) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const validationErrors = postValidation(data);
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      if (method === "new") {
        createNewPostMutation.mutate({ userId, data });
      } else {
        updatePostMutation.mutate({ userId, postId, data });
      }
    } else {
      setErrors(validationErrors);
    }
  }

  function cancelHandler() {
    navigate("/dashboard");
  }

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmitPost}>
        <div className={classes.control}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={post ? post.title : ""}
            maxLength={50}
          />
        </div>
        {errors && errors.title && (
          <p className={classes.controlError}>{errors.title}</p>
        )}
        <div className={classes.control}>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            required
            defaultValue={post ? post.author : ""}
            readOnly={!method}
            maxLength={25}
          />
        </div>
        {errors && errors.author && (
          <p className={classes.controlError}>{errors.author}</p>
        )}
        <div className={classes.control}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={method === "new" ? formattedDate : post ? post.date : ""}
            readOnly
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
            maxLength={500}
          ></textarea>
        </div>
        {errors && errors.content && (
          <p className={classes.controlError}>{errors.content}</p>
        )}
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
      {(createNewPostMutation.isLoading || updatePostMutation.isLoading) && (
        <>
          <p className={classes.loading}>
            {method === "new" ? "Creating Post......" : "Updating post......"}{" "}
          </p>
          <LoadingIndicator />
        </>
      )}
      {createNewPostMutation.isError && (
        <ErrorBlock
          title="An error occurred"
          message={
            createNewPostMutation.error?.message || "Failed to create post"
          }
        ></ErrorBlock>
      )}
      {updatePostMutation.isError && (
        <ErrorBlock
          title="An error occurred"
          message={
            createNewPostMutation.error?.message || "Failed to update post"
          }
        ></ErrorBlock>
      )}
    </>
  );
}
