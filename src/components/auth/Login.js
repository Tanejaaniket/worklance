import { useState } from "react";
import { app, auth, db } from "../../Firebase";
import { toast } from "react-toastify";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Spinner } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load,setLoad] = useState(false);

  const nav = useNavigate();
  const handleLogin = (e) => {
    setLoad(true)
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const docRef = doc(db, "users", userCredential.user.uid);
        const userDetails = await getDoc(docRef);
        if (userDetails.exists()) {
          const userData = userDetails.data();
          toast.success("Signed In Successfully");
          console.log(userData);

          sessionStorage.setItem("email", userData.email);
          sessionStorage.setItem("name", userData.userName);
          sessionStorage.setItem("id", userData.userId);
          if (userData.userType == 2) {
            nav("/");
          } else {
            nav("/admin");
          }
        } else {
          toast.error("Invalid Credentials");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(
        ()=>{
          setTimeout(()=>{setLoad(false)},500)
        }
      );
  };
  const googleLogin = () => {
    setLoad(true)
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log(userCredential);

        toast.success("Registered Successfully");
        sessionStorage.setItem("email", userCredential.user.email);
        sessionStorage.setItem("name", userCredential.user.displayName);
        sessionStorage.setItem("id", userCredential.user.uid);
        nav("/");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(
        ()=>{
          setTimeout(()=>{setLoad(false)},500)
        }
      );
  };

  const goHome = () => {
    nav("/");
  };
  return (
    <>
      <div className="py-2 ps-3 profile-strip-color">
        <button className="btn custom-btn py-0" onClick={goHome}>
        <i className="bi bi-x fs-3"></i>
        </button>
      </div>
      <main className="auth-page">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h1>
                Welcome<span className="custom-txt"> back!</span>
              </h1>
              <p className="text-muted">
                Enter your credentials below to access your Worklance account.
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col offset-sm-3">
              <form onSubmit={handleLogin}>
                <div className="row my-4">
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email*"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password*"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm-8">
                  {
                      load?(
                      <button className="btn custom-btn w-100 " disabled>
                      <Spinner size="sm" variant="light"/>
                      </button>):(
                        <button className="btn custom-btn w-100" type="submit">
                        Submit
                      </button>
                      )
                    }
                  </div>
                </div>
              </form>
              <div className="row my-4">
                <div className="col-sm-8">
                  <button
                    className="btn btn-outline-success w-100"
                    onClick={googleLogin}
                  >
                    <i className="bi bi-google me-3"></i>
                    Login with Google
                  </button>
                </div>
              </div>
              <div className="row my-4">
                <div className="col-sm-8 text-center ">
                  <a
                    className="text-decoration-none cursor-pointer"
                    onClick={()=>{
                      nav("/signup")
                    }}
                  >
                    New member? Register here
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
