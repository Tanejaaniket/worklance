import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { db } from "../../Firebase";

export default function ViewHistoryModal({ bids }) {
  const [show, setShow] = useState(0);
  const [projectInfo, setProjectInfo] = useState({});
  const [q, setq] = useState("");
  const [c, setc] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const handleClose = () => setShow(0);
  const handleShow = () => setShow(1);
  const fetchData = async () => {
    const docRef = doc(db, "project", bids.data.projectId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setq(docSnap.data().qualifications);
      setc(docSnap.data().clientDetails);
      setProjectInfo(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  let qualifications = q.split(",");
  let contact = c.split(",");

  return (
    <>
      <button className="btn custom-btn" onClick={handleShow}>
        View Details
      </button>

      <Modal show={Boolean(show)} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-check-circle text-success" />{" "}
            {projectInfo.projectTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="px-2">
            <p className=" modal-para">
              <b>Details:</b> {projectInfo.description}
            </p>
            <h5 className="description-heading fw-bold">Prefered Qualities</h5>
            <ul className="modal-para">
              {qualifications.map((item, index) => (
                <li>{item}</li>
              ))}
            </ul>
            <div className="modal-para">
              <h5 className="description-heading fw-bold">
                Deadlines and Budget
              </h5>
              <p>
                <i className="bi bi-clock" /> {projectInfo.approxTime} days
              </p>
              <p>
                <i className="bi bi-currency-rupee" /> {projectInfo.budget} INR
              </p>
            </div>
            <div className="modal-para">
              <h5 className="description-heading fw-bold">Client Details</h5>
              {contact.map((item, index) => {
                return(<li>{item}</li>)
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
