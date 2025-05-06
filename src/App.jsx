import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/requests.js";
import MainRoot from "./pages/mainRoot.jsx";
import Home from "./pages/Home.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import Login from "./pages/Login.jsx";
import PostEdit from "./pages/PostEdit.jsx";
import PostsRoot from "./pages/PostsRoot.jsx";
import NewPost from "./pages/NewPost.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { initAuthListener } from "./store/authSlice.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth",
        element: <Login />,
      },
      {
        path: "posts",
        element: <PostsRoot />,
        children: [
          {
            index: true,
            element: <AllPosts />,
          },
          {
            path: "new",
            element: <NewPost />,
          },
        ],
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "dashboard/:postId/edit",
        element: <PostEdit />,
      },
    ],
  },
]);

function App() {
  initAuthListener();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
