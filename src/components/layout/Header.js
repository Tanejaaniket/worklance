import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../Firebase";
export default function Header(prop) {
  const email = sessionStorage.getItem("email");
	const id = sessionStorage.getItem("id")
  const nav = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        nav("/login");
      })
      .catch((error) => {
        toast.error("Error logging out");
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
            <Link className="navbar-brand ms-2 me-5" to="/">
              <img
                src="/assets/img/icon/worklance-no-bg.svg"
                className="header-company-logo"
              />
            </Link>
            {!email ? (
              <Link
                className="btn custom-btn px-3 py-2 navbar-toggler d-none d-sm-block d-lg-none me-1 ms-auto"
                to="/login"
              >
                Sign in
              </Link>
            ) : (
              ""
            )}
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
                    className="header-company-logo"
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
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item me-5">
                    <Link className="nav-link" to="/about">
                      About
                    </Link>
                  </li>
                  {email ? (
                    <li className="nav-item me-5">
                      <Link className="nav-link" to="/contact">
                        Contact Us
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
                <div className="d-flex align-items-center me-4">
                  {!email ? (
                    <>
                      <Link className="nav-link me-3" to="/login">
                        Sign in
                      </Link>
                      <Link
                        className="btn custom-btn py-2 create-account"
                        to="/signup"
                      >
                        Create account
                      </Link>
                    </>
                  ) : (
                    <>
                      <a
                        className="me-3 text-black"
                        onClick={() => {
                          nav(`/profile/${id}`);
                        }}
                      >
                        <i className="bi bi-person fs-3"></i>
                      </a>
                      <a className="btn btn-danger" onClick={handleLogout}>
                        Logout
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
