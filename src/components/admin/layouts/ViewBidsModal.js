import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { db } from "../../../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ViewBidsModal({ project }) {
  const [show, setShow] = useState(0);
  const [bidData, setBidData] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "bids"),
      where("projectId", "==", project.id),
      where("status","!=",2),
      orderBy("status","desc")
    );
    onSnapshot(q, (dataObj) => {
      const fetchedData = dataObj.docs.map((el) => {
        return {
          id: el.id,
          data: el.data(),
        };
      });
      setBidData(fetchedData);
    });
  }, [project.id]);
  const handleClose = () => setShow(0);
  const handleShow = () => setShow(1);
  const formatDate = (date) => {
    let x = date.toDate().toString();
    x = x.split(" ");
    return x[0] + " " + x[1] + " " + x[2];
  };
  const assignProject = async (bid) =>{
    console.log("User info is",bid);
    
    try{
      const data = {
        ...bid.data,
        status:1
      };
      console.log(data);
      
    await setDoc(doc(db,"bids",bid.id),data);
    toast.success(`Project assignment successfully`)
    }catch(err){
      toast.error("Something went wrong")
    }
  }
  const completedProject = async (bid) =>{
    try{
      let data = {
        ...bid.data,
        status: 2
      };
    await setDoc(doc(db,"bids",bid.id),data);
    data = {
      ...project.data,
      status: false
    };
    await setDoc(doc(db,"project",project.id),data);
    toast.success(`Project status updated successfully`)
    }catch(err){
      toast.error("Something went wrong")
    }
  }
  const nav = useNavigate()
  return (
    <>
      <button className="btn w-100 text-start" onClick={handleShow}>
        View Bids
      </button>

      <Modal show={Boolean(show)} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{project.data.projectTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <table className="table table-hover">
              <caption>Bids of users</caption>
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Bid</th>
                  <th scope="col">
                    Applied on
                  </th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bidData.map((el, i) => {
                  return (
                    <tr
                      className={el.data.status==1?"cursor-pointer table-success fw-bold":"cursor-pointer"}
                      key={el.id}
                    >
                      <th scope="row">{i + 1}</th>
                      <td>{el.data.userName}</td>
                      <td className="fw-bold">Rs.{el.data.bidAmount}</td>
                      <td>
                        {formatDate(el.data.createdAt)}
                      </td>
                      <td>
                        <div className="dropdown">
                          <a
                            className="btn btn-light dropdown-toggle admin-action-dropdown"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            ⋮
                          </a>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li>
                              <button className="btn w-100 text-start" onClick={()=>{
                                assignProject(el)
                              }}>
                                Assign Project
                              </button>
                            </li>
                            <li>
                              <button className="btn w-100 text-start" onClick={()=>{
                                completedProject(el)
                              }}>
                                Mark as complete
                              </button>
                            </li>
                            <li>
                              <Link className="btn w-100 text-start" to={`/admin/viewprofile/${el.data.userId}`}>
                                View Profile
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
