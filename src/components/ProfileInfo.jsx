import { useSelector } from "react-redux";
import classes from "./ProfileInfo.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../util/requests";
import LoadingIndicator from "./LoadingIndicator";
import ErrorBlock from "./ErrorBlock.jsx";

export default function ProfileInfo() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userId = currentUser.uid;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["userData", currentUser.uid],
    queryFn: () => fetchUserInfo({ userId }),
  });

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
    content = (
      <div className={classes.userData}>
        <div className={classes.userDetails}>
          <p>
            <span>Name:</span> {data.name}
          </p>
          <p>
            <span>Email:</span> {data.email}
          </p>
          <p>
            <span>Position:</span> {data.position}
          </p>
          <p>
            <span>Location:</span> {data.location}
          </p>
        </div>
        <p className={classes.bio}>{data.bio}</p>
      </div>
    );
  }

  return (
    <div className={classes.profileInfo}>
      <h2>Profile Information</h2>
      {content}
    </div>
  );
}
