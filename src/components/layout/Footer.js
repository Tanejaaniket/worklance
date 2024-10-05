import { useState } from "react";
import { addDoc,collection,Timestamp } from "firebase/firestore";
import { db } from "../../Firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


export default function Footer() {
  const [email,setEmail] = useState("");
  const handleForm = async(e) =>{
    e.preventDefault();
    try{
      const data = {
        email:email,
        createdAt:Timestamp.now(),
        status:true
      }
      await addDoc(collection(db,"newsletter"),data);
      toast.success("Thank you for subscribing!!")
      setEmail("");
    }catch(err){
      toast.error("Something went wrong!! Please try again")
    }
  }
  return (
    <footer>
      <div className="container py-5 border-top border-bottom ">
        <div className="row">
          <div className="col-md text-start mt-4">
            <img
              src="/assets/img/icon/worklance-no-bg.svg"
              className="header-company-logo d-block mx-auto mb-3"
            />
            <p>
              Worklance connects businesses with skilled freelancers. Find and
              hire the perfect freelancer for your needs. Grow your client base
              as a freelancer on Worklance.
            </p>
            <div className="social-media d-block d-sm-flex justify-content-evenly">
              <a href="https://www.facebook.com/" target="_blank">
                <img
                  src="/assets/img/icon/facebook-icon.svg"
                  className="footer-img "
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
                  className="footer-img "
                />
              </a>
            </div>
          </div>
          <div className="col-md offset-md-1 text-start mt-4">
            <h4>Company</h4>
            <p>
              <Link to="/about" className="text-reset text-decoration-none">
                About Us
              </Link>
            </p>
            <p>
              <a href="#project" className="text-reset text-decoration-none">
                Projects
              </a>
            </p>
            <p>
              <Link to="/login" className="text-reset text-decoration-none">
                Sign in
              </Link>
            </p>
          </div>
          <div className="col-md text-start mt-4">
            <h4>Newsletter</h4>
            <p className="text-muted">
              Sign up and recieve latest tip via emails.
            </p>
            <form onSubmit={handleForm} className="text-muted" >
              <label htmlFor="email" className="mt-3">
                Your e-mail:
              </label>
              <input
                className="form-control mt-2"
                type="email"
                name="email"
                placeholder="e-mail:"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                required
              />
              <button className="btn custom-btn w-100 mt-3">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <div className="copyright-block text-muted text-center py-3">
        2024 &copy; All right reserved. Created by Aniket Taneja
      </div>
    </footer>
  );
}
