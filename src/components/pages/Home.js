import { useState } from "react";
import Project from "../layout/Projects";
import Technologies from "../layout/Technologies";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [load,setLoad] = useState(true);
  setTimeout(()=>{setLoad(false)},1000)
  if(load){
    return <Spinner style={{display:"block",margin:"35vh auto", height:"10vh",width:"10vh",borderColor:"#92d35e",borderRightColor:"transparent"}}/>
  }
  return (
    <>
      <main>
        <div className="intro">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg">
                <div className="row mb-5">
                  <div className="col">
                    <h1 className="heading">
                      Looking for projects?
                      <br />
                      <span className="custom-txt">we got you</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p className="text-muted ">Search projects</p>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        window.location.hash = "#project";
                      }}
                      className="bg-white py-3 rounded-4 d-flex justify-content-around col-md-9"
                    >
                      <img
                        className="search-icon"
                        src="/assets/img/icon/search-icon.svg"
                        alt=""
                      />
                      <input
                        type="text"
                        name="search"
                        className="border-0 w-50 intro-search-bar"
                        placeholder="Search projects"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                        }}
                        required
                      />
                      <a href="#project" className="btn custom-btn">
                        Search
                      </a>
                    </form>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5 d-flex mt-5 mb-3 justify-content-evenly">
                    <p className="text-muted">Follow us:</p>
                    <a href="https://www.facebook.com/" target="_blank">
                      <img
                        src="/assets/img/icon/facebook-icon.svg"
                        className="footer-img"
                      />
                    </a>
                    <a href="https://x.com/?lang=en" target="_blank">
                      <img
                        src="/assets/img/icon/twitter-icon.svg"
                        className="footer-img "
                      />
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank">
                      <img
                        src="/assets/img/icon/linkedin-icon.svg"
                        className="footer-img "
                      />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank">
                      <img
                        src="/assets/img/icon/instagram-icon.svg"
                        className="footer-img"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg d-none d-sm-block">
                <img
                  src="/assets/img/intro.png"
                  alt=""
                  className="intro-pic w-100"
                />
              </div>
            </div>
          </div>
        </div>
        <h1 className=" heading text-center py-5">
          Technologies on <span className="custom-txt">our platform</span>
        </h1>
        <Technologies />
        <h1 className=" heading text-center py-5" id="project">
          Projects for <span className="custom-txt">you</span>
        </h1>
        <Project searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="container py-5">
          <div className="row pb-5 text-center">
            <h1 className="heading">
              Subscribe to <span className="custom-txt">our newsletter</span>
            </h1>
          </div>
        </div>
        <Newsletter />
        <div className="find-project text-center my-5">
          <h1 className="heading">
            <span className="custom-txt"> Find projects </span>
            <span>
              around <br /> the world
            </span>
          </h1>
        </div>
      </main>
    </>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: email,
        createdAt: Timestamp.now(),
        status: true,
      };
      await addDoc(collection(db, "newsletter"), data);
      toast.success("Thank you for subscribing!!");
      setEmail("");
    } catch (err) {
      toast.error("Something went wrong!! Please try again");
    }
  };
  return (
    <div className="container custom-btn rounded-4 py-2">
      <form onSubmit={handleForm}>
        <div className="row my-5 align-items-center text-center">
          <div className="col-md-6">
            <h1 className="py-3">Get update news</h1>
            <p>Subscribe to our email and get latest updates every week</p>
          </div>
          <div className="col-md-6">
            <div className="row py-5">
              <div className="col-md-7 mb-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="col-sm-3">
                <button className="btn btn-dark w-100" type="submit">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
