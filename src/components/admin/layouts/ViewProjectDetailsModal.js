import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ViewProjectDetailsModal({ project }) {
  const [show, setShow] = useState(0);
  let qualifications = project.data.qualifications;
  qualifications = qualifications.split(",");
  let clientDetails = project.data.clientDetails;
  clientDetails = clientDetails.split(",");
    
  const handleClose = () => setShow(0);
  const handleShow = () => setShow(1);
  console.log(project);

  return (
    <>
      <button className="btn w-100 text-start" onClick={handleShow}>
        View Details
      </button>

      <Modal show={Boolean(show)} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>
            {project.data.projectTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="px-2">
            <p className=" modal-para">
              <b>Details:</b> {project.data.description}
            </p>
            <h5 className="description-heading fw-bold">Prefered Qualities</h5>
            <ul className="modal-para">
              {
                qualifications.map((qualification, index) =>{
                    return <li key={index}>{qualification}</li>;
                })
              }
            </ul>
            <div className="modal-para">
              <h5 className="description-heading fw-bold">
                Deadlines and Budget
              </h5>
              <p>
                <i className="bi bi-clock" /> {project.data.approxTime} days
              </p>
              <p>
                <i className="bi bi-currency-rupee" /> {project.data.budget} INR
              </p>
            </div>
            <div className="modal-para">
              <h5 className="description-heading fw-bold">Client Details</h5>
              {
                clientDetails.map((clientDetail, index) =>{
                    return <li key={index}>{clientDetail}</li>;
                })
              }
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
