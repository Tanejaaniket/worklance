import { toast } from "react-toastify";
import AdminHeader from "./AdminHeader";
import { Navigate, Outlet } from "react-router-dom";

export default function MasterAdmin() {
  const email = sessionStorage.getItem("email");
  if (email!="admin@gmail.com") {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
}
