import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../Firebase";
import { toast } from "react-toastify";
export default function AdminHeader() {
  const nav = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        nav("/login");
      })
      .catch((error) => {
        toast.error("Error logging out")
      });
  };
  return (
    <>
      <header>
        <nav
          className="navbar py-2 navbar-expand-lg bg-body-tertiary"
          data-bs-spy="scroll"
        >
          <div className="container-fluid align-items-center ">
            <Link className="navbar-brand ms-2 me-5" to="/admin">
              <img
                src="/assets/img/icon/worklance-no-bg.svg"
                style={{width:"100px"}}
              />
            </Link>
            <Link className="btn btn-danger px-3 py-2 d-none d-sm-block d-lg-none me-1 ms-auto">
              Logout
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="offcanvas offcanvas-end"
              tabIndex={-1}
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                  <img
                    src="/assets/img/icon/worklance-no-bg.svg"
                    style={{width:"100px"}}
                  />
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav flex-grow-1 pe-3 justify-content-start">
                  <li className="nav-item me-5">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/admin"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item me-5">
                    <Link
                      className="nav-link"
                      to="/admin/enquiries"
                    >
                      Enquiries
                    </Link>
                  </li>
                  <li className="nav-item me-5 dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Technology
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/admin/addtechnology">
                          Add Technology
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/managetechnology">
                          Manage Technologies
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item me-5 dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Project
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/admin/addproject">
                          Add Project
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/manageproject">
                          Manage Projects
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <a className="btn btn-danger py-2 logout-btn" onClick={handleLogout}>
                    Logout
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
