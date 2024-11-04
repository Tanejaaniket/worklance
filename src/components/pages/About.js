import { Link } from "react-router-dom";
import { Newsletter } from "./Home";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
export default function About() {
  const [load,setLoad] = useState(true);
  setTimeout(()=>{setLoad(false)},500)
  if(load){
    return <Spinner style={{display:"block",margin:"35vh auto", height:"10vh",width:"10vh",borderColor:"#92d35e",borderRightColor:"transparent"}}/>
  }
  return (
    <>
      <div className="container text-center fs-5">
        <h1 className="py-5 heading">
          About the <span className="custom-txt">company</span>
        </h1>
        <div className="d-none d-lg-block" style={{height:"70vh",width:"100%"}}>
          <img src="/assets/img/teamwork.png" className="h-100" />
        </div>
        <div className="text-start my-5 about-text">
            <h1 className="py-5">What we do</h1>
          <ul>
            <li>
              <b>Freelance Marketplace:</b> Worklance is a platform that
              connects businesses and individuals with talented freelancers for
              all their project needs.
            </li>
            <li>
              <b>Streamlined Workflow: </b> We provide a user-friendly platform
              that simplifies the process of finding work, hiring talent,
              managing projects, and ensuring secure transactions
            </li>
            <li>
              <b>Diverse Talent Pool: </b>Our extensive network boasts a wide
              range of skilled freelancers across various industries and
              specializations.
            </li>
          </ul>
          <h1 className="py-5">Why choose Worklance</h1>
          <ul>
            <li>
              <b>For Freelancers:</b>Find and secure freelance projects that
              match your skills and interests. Enjoy the flexibility and freedom
              of working on your own terms.
            </li>
            <li>
              <b>For Businesses: </b> Access a vast pool of pre-vetted talent to
              find the perfect fit for your projects. Benefit from
              cost-effective solutions and a streamlined workflow.
            </li>
            <li>
              <b>For Everyone: </b>Experience a secure and transparent platform
              that fosters collaboration and empowers businesses and freelancers
              to achieve their goals.
            </li>
          </ul>
          <h1 className="py-5">Ready to get started?</h1>
          <h4>As a freelancer you can</h4>
          <ul>
            <li>
              <Link className="custom-txt text-decoration-none" to="/signup">Create your free profile:</Link>Showcase your skills and
              experience to attract potential clients.
            </li>
            <li>
              <Link className="custom-txt text-decoration-none" to="/#project">Browse projects: </Link> Find exciting opportunities that
              match your expertise and interests.
            </li>
            <li>
              <Link className="custom-txt text-decoration-none" to="/#project">Submit proposals:</Link>Stand out with compelling proposals
              to win projects and build your freelance career..
            </li>
          </ul>
        </div>
      </div>
        <h1 className="heading py-5 text-center">Subscribe to <span className="custom-txt">our newsletter</span></h1>
        <Newsletter/>
    </>
  );
}
