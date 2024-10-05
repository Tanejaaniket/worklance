import { useState } from "react";
import { toast } from "react-toastify";
import { app, auth, db } from "../../Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export default function Register() {
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [load,setLoad] = useState(false);

  const nav = useNavigate();
  const handleNavigation = (path, data) => {
    nav(path);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("name", data.userName);
    sessionStorage.setItem("id", data.userId);
  };
  const handleData = async (userId) => {
    try {
      const data = {
        userName: Fname + " " + Lname,
        email: email,
        contact: contact,
        address: address,
        createdAt: Timestamp.now(),
        userId: userId,
        userType: 2,
        status: true,
      };
      await setDoc(doc(db, "users", userId), data);
      toast.success("Registered Successfully!! Please create your profile");
      handleNavigation("/", data);
    } catch (e) {
      toast.error("Something went wrong. Please try again later");
    }
  };
  const handleForm = (e) => {
    e.preventDefault();
    setLoad(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        handleData(userCredential.user.uid);
        setEmail("");
        setAddress("");
        setPassword("");
        setContact("");
        setFname("");
        setLname("");
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
  const googleSignUp = () => {
    setLoad(true)
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        console.log(userCredential);
        
        const data = {
          userName: userCredential.user.displayName,
          email: userCredential.user.email,
          contact: userCredential.user.phoneNumber,
          address: address,
          createdAt: Timestamp.now(),
          userId: userCredential.user.uid,
          userType: 2,
          url:userCredential.user.photoURL,
          status: true,
        };
        await setDoc(doc(db, "users", userCredential.user.uid), data);
        toast.success("Registered Successfully");
        handleNavigation("/", {
          userName: userCredential.user.displayName,
          email: userCredential.user.email,
          id:userCredential.user.uid
        });
        
        
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(
        ()=>{
          setTimeout(()=>{setLoad(false)},500)
        }
      )
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
                Join the
                <span className="custom-txt"> Worklance community!</span>
              </h1>
              <p className="text-muted">
                Create your free account to start finding work or hiring talent
                today.
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col offset-sm-3">
              <form onSubmit={handleForm}>
                <div className="row my-4">
                  <div className="col-sm-4">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="First Name*"
                      value={Fname}
                      onChange={(e) => {
                        setFname(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="col-sm-4">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Last Name (Optional)"
                      value={Lname}
                      onChange={(e) => {
                        setLname(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email*"
                      required
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
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Contact*"
                      min={1000000000}
                      max={9999999999}
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm-8">
                    <textarea
                      className="form-control"
                      placeholder="Address*"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      required
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
                    onClick={googleSignUp}
                  >
                    <i className="bi bi-google me-3"></i>
                    Sign Up with Google
                  </button>
                </div>
              </div>
              <div className="row my-4">
                <div className="col-sm-8 text-center ">
                  <a
                    className="text-decoration-none cursor-pointer"
                    onClick={()=>{
                      nav("/login")
                    }}
                  >
                    Already a member? Log in here
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
