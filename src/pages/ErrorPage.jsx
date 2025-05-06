import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNav.jsx";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An Error Occured!";
  let message = "Something Went Wrong!";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not Found";
    message = "Could not find resource";
  }

  return (
    <>
      <MainNavigation />
      <div>
        <h1>{title}</h1>
        <p>{message}</p>
        <Link to="/">Home</Link>
      </div>
    </>
  );
}
