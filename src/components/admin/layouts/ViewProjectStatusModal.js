import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ViewProjectStatus() {
  const [show, setShow] = useState(0);


  const handleClose = () => setShow(0);
  const handleShow = () => setShow(1);

  return (
    <>
      <Button variant="primary me-3" onClick={handleShow}>
        View All
      </Button>

      <Modal show={Boolean(show)} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Project 1 bids</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col offset-sm-3">
                <div className="row my-4">
                  <div className="col-sm-6 py-3">
                    <h5>Project Title 1</h5>
                  </div>
                  <div className="col-sm-2 my-3 d-sm-flex d-block justify-content-around">
                    <i className="bi bi-clock bg-danger recent-project-icon text-white fs-5 rounded-circle"></i>
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm-6 py-3">
                    <h5>Project Title 2</h5>
                  </div>
                  <div className="col-sm-2 my-3 d-sm-flex d-block justify-content-around">
                    <i className="bi bi-clock bg-danger recent-project-icon text-white fs-5 rounded-circle"></i>
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm-6 py-3">
                    <h5>Project Title 3</h5>
                  </div>
                  <div className="col-sm-2 my-3 d-sm-flex d-block justify-content-around">
                    <i className="bi bi-clock bg-danger recent-project-icon text-white fs-5 rounded-circle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
