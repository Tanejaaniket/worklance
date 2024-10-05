import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getCountFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { Spinner } from "react-bootstrap";

export default function AdminHome() {
  const [enquiryId, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState([]);
  const [enquiry, setEnquiry] = useState([]);
  const [activeProject, setActiveProject] = useState([]);
  const [totalEnquiry, setTotalEnquiry] = useState([]);
  const [totalUsers, setTotalUsers] = useState();
  const [newsSubs, setNewsSubs] = useState([]);
  const [load,setLoad] = useState(true);
  const showEnquiry = (e) => {
    setId(e.target.value);
    if (open == true) {
      setOpen(false);
      e.target.innerText = "Read More";
    } else {
      setOpen(true);
      e.target.innerText = "Read Less";
    }
  };
  useEffect(() => {
    try{
      const q1 = query(
        collection(db, "project"),
        limit(3),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q1, (dataObj) => {
        const fetchedData = dataObj.docs.map((el) => {
          return {
            id: el.id,
            data: el.data(),
          };
        });
        setProject(fetchedData);
      });
      const q2 = query(
        collection(db, "enquiry"),
        limit(2),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q2, (dataObj) => {
        const fetchedData = dataObj.docs.map((el) => {
          return {
            id: el.id,
            data: el.data(),
          };
        });
        setEnquiry(fetchedData);
      });
      const q3 = query(
        collection(db, "project"),
        where("status", "==", true)
      );
      onSnapshot(q3, (dataObj) => {
        const fetchedData = dataObj.docs.map((el) => {
          return {
            id: el.id,
            data: el.data(),
          };
        });
        setActiveProject(fetchedData);
      });
      const q4 = query(
        collection(db, "enquiry"),
        where("status", "==", true),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q4, (dataObj) => {
        const fetchedData = dataObj.docs.map((el) => {
          return {
            id: el.id,
            data: el.data(),
          };
        });
        setTotalEnquiry(fetchedData);
      });
      const q5 = collection(db, "users");
      (async () => {
        const users = await getCountFromServer(q5);
        setTotalUsers(users.data().count);
      })()
  
      const q6 = query(
        collection(db, "newsletter"),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q6, (dataObj) => {
        const fetchedData = dataObj.docs.map((el) => {
          return {
            id: el.id,
            data: el.data(),
          };
        });
        setNewsSubs(fetchedData);
      });
    }catch(err){
      console.log(err.message);
    }finally{
      setTimeout(()=>{setLoad(false)},1000)
    }
  }, []);
  if(load){
    return <Spinner variant="primary" style={{display:"block",margin:"35vh auto", height:"10vh",width:"10vh" }}/>
  }
  return (
    <>
      <div className="container pt-3">
        <div className="row align-items-center">
          <div className="col-12 py-2 ">
            <div className="card  admin-dashboard-cards">
              <div className="card-header">
                <h3 className="card-title py-2">Website Overview</h3>
              </div>
              <div className="container card-body py-5">
                <div className="row align-items-center">
                  <div className="col-lg-3 d-flex my-3">
                    <div className=" me-4 my-auto">
                      <i className="bi bi-people-fill fs-3 bg-warning dashboard-icon"></i>
                    </div>
                    <div>
                      <h4 className="text-muted">Total Users</h4>
                      <h4>{totalUsers}</h4>
                    </div>
                  </div>
                  <div className="col-lg-3 d-flex my-3 ">
                    <div className=" me-4 my-auto">
                      <i className="bi bi-code-slash fs-3 text-white bg-danger dashboard-icon"></i>
                    </div>
                    <div>
                      <h4 className="text-muted">Active Projects</h4>
                      <h4>{activeProject.length}</h4>
                    </div>
                  </div>
                  <div className="col-lg-3 d-flex my-3">
                    <div className="me-4 my-auto">
                      <i className="bi bi-envelope-at fs-3 text-white bg-success dashboard-icon "></i>
                    </div>
                    <div>
                      <h4 className="text-muted">Active Enquiries</h4>
                      <h4>{totalEnquiry.length}</h4>
                    </div>
                  </div>
                  <div className="col-lg-3 d-flex my-3">
                    <div className="me-4 my-auto">
                      <i className="bi bi-envelope-paper fs-3 text-white bg-info dashboard-icon "></i>
                    </div>
                    <div>
                      <h4 className="text-muted">Newsletter Subscribers</h4>
                      <h4>{newsSubs.length}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-3">
        <div className="row">
          <div className="col-md-6 py-2 ">
            <div className="card  admin-dashboard-cards">
              <div className="card-header">
                <h3 className="card-title py-2">Recent Projects</h3>
              </div>
              <div className="container card-body py-3">
                {project.map((el) => {
                  return (
                    <div className="row my-3 align-items-center" key={el.id}>
                      <div className="col-lg-10 py-3">
                        <h5>{el.data.projectTitle}</h5>
                      </div>
                      <div className="col-sm-2 text-sm-center">
                        {el.data.status ? (
                          <i className="bi bi-check-lg bg-success recent-project-icon text-white fs-5 rounded-circle"></i>
                        ) : (
                          <i className="bi bi-clock bg-danger recent-project-icon text-white fs-5 rounded-circle"></i>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="row my-3 align-items-center">
                  <div className="col fs-5 text-end">
                    <Link to="/admin/manageproject" className="btn btn-primary">
                      View all
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 py-2 ">
            <div className="card  admin-dashboard-cards pb-4">
              <div className="card-header">
                <h3 className="card-title py-2">Recent Enquiries</h3>
              </div>
              <div className="container card-body py-3">
                {enquiry.map((el, index) => {
                  return (
                    <div className="row my-3 align-items-center" key={el.id}>
                      <div className="col-sm-3 py-3">
                        <h5>{el.data.email}</h5>
                      </div>
                      <div className="col-sm-9 fs-5">
                        <p
                          className={
                            enquiryId == { index } && open === true
                              ? ""
                              : "dash-enquiry-box"
                          }
                        >
                          {el.data.message}
                        </p>
                        <button
                          className="btn btn-outline-primary"
                          value={index}
                          onClick={showEnquiry}
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="row my-3 align-items-center">
                  <div className="col fs-5 text-end ">
                    <Link className="btn btn-primary" to="/admin/enquiries">
                      View All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
