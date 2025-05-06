import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav.jsx";

export default function MainRoot() {
  return (
    <>
      <MainNav />
      <main>
        <Outlet />
      </main>
    </>
  );
}
