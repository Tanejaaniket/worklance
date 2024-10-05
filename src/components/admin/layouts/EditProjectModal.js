import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { db } from "../../../Firebase";
import { toast } from "react-toastify";

export default function EditProjectModal({ project, projectTech }) {
  const [show, setShow] = useState(0);
  const [projectName, setProjectName] = useState(project.data.projectTitle);
  const [projectDescription, setProjectDescription] = useState(
    project.data.description
  );
  const [preferedQualifications, setpreferedQualification] = useState(
    project.data.qualifications
  );
  const [clientDetails, setClientDetails] = useState(
    project.data.clientDetails
  );
  const [selectedTech, setSelectedTech] = useState(project.data.technologyName);
  const [deadline, setDeadline] = useState(project.data.approxTime);
  const [budget, setBudget] = useState(project.data.budget);

  const handleClose = () => setShow(0);
  const handleShow = () => setShow(1);
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...project.data,
        projectTitle: projectName,
        description: projectDescription,
        budget: budget,
        approxTime: deadline,
        clientDetails: clientDetails,
        qualifications: preferedQualifications,
        technologyName: selectedTech,
      };
      await setDoc(doc(db, "project", project.id), data);
      toast.success("Data editted successfully");
      setShow(0);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <button className="btn w-100 text-start" onClick={handleShow}>
        Edit Details
      </button>

      <Modal show={Boolean(show)} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleForm}>
            <div className="row justify-content-center">
              <div className="col">
                <div className="row my-4">
                  <div className="col-sm">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Project name*"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm">
                    <textarea
                      className="form-control"
                      placeholder="Project Description*"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm">
                    <textarea
                      className="form-control"
                      placeholder="Preferd Qualifications (Seprated with , )"
                      value={preferedQualifications}
                      onChange={(e) => setpreferedQualification(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm">
                    <textarea
                      className="form-control"
                      placeholder="Client details (Seprated with , )"
                      value={clientDetails}
                      onChange={(e) => setClientDetails(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm">
                    <select
                      className="form-control"
                      value={selectedTech}
                      onChange={(e) => setSelectedTech(e.target.value)}
                      required
                    >
                      <option disabled selected>
                        Choose a Technology
                      </option>
                      {projectTech.map((tech, index) => {
                        return (
                          <option key={index} value={tech.data.technologyName}>
                            {tech.data.technologyName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Deadline (in Days) *"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      className="form-control"
                      type="number"
                      min={100}
                      placeholder="Project Budget (in INR) *"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm-4  d-block mx-auto text-end">
                    <button className="btn btn-primary w-100" type="submit">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
