import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ViewEnquiryModal({enquiry,deleteMessage}) {
  const [show, setShow] = useState(0);

  const handleClose = () => setShow(0);
  const handleShow = () => setShow(1);
  const formatDate = (date) => {
    let x = date.toDate().toString();
    x = x.split(" ");
    return x[0] + " " + x[1] + " " + x[2];
  };
  return (
    <>
      <button className="btn w-100 text-start" onClick={handleShow}>
        View Enquiry
      </button>

      <Modal show={Boolean(show)} onHide={handleClose} centered>
      <Modal.Header closeButton>
          <Modal.Title>{enquiry.data.email} says...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className="fs-5">{enquiry.data.message}</p>
            <p className="text-muted fs-6">Written at {formatDate(enquiry.data.createdAt)}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={()=>{deleteMessage(enquiry.id)}}>Delete enquiry</Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
