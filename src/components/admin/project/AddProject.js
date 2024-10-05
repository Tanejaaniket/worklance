import {
  addDoc,
  collection,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../Firebase";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

export default function AddProject() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [preferedQualifications, setpreferedQualification] = useState("");
  const [clientDetails, setClientDetails] = useState("");
  const [technology, setTechnology] = useState([]);
  const [selectedTech, setSelectedTech] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");
  const [load, setLoad] = useState(false);
  const [mainLoad, setMainLoad] = useState(true);
  const addProject = async (e) => {
    setLoad(true);
    e.preventDefault();
    try {
      const data = {
        projectTitle: projectName,
        description: projectDescription,
        budget: budget,
        approxTime: deadline,
        clientDetails: clientDetails,
        qualifications: preferedQualifications,
        technologyName: selectedTech,
        createdAt: Timestamp.now(),
        status: true,
      };
      await addDoc(collection(db, "project"), data);
      toast.success("Project created successfully");
      setBudget("");
      setProjectDescription("");
      setProjectName("");
      setpreferedQualification("");
      setClientDetails("");
      setDeadline("");
      setSelectedTech("");
    } catch (err) {
      toast.error("Something went wrong. Please try again later");
    } finally {
      setTimeout(() => {
        setLoad(false);
      }, 500);
    }
  };
  useEffect(() => {
    try {
      const q = query(collection(db, "technology"));
      onSnapshot(q, (dataObj) => {
        const fetchedData = dataObj.docs.map((el) => {
          return {
            id: el.id,
            data: el.data(),
          };
        });
        setTechnology(fetchedData);
      });
    } finally {
      setTimeout(() => {
        setMainLoad(false);
      }, 1000);
    }
  }, []);
  if (mainLoad) {
    return (
      <Spinner
        variant="primary"
        style={{
          display: "block",
          margin: "35vh auto",
          height: "10vh",
          width: "10vh",
        }}
      />
    );
  }
  return (
    <>
      <div className="container my-5 pt-5">
        <div className="row">
          <div className="col text-center">
            <h1>
              Add a<span className="admin-custom-txt"> new project</span> for
              freelancers
            </h1>
          </div>
        </div>
      </div>
      <div className="container">
        <form onSubmit={addProject}>
          <div className="row">
            <div className="col offset-sm-3">
              <div className="row my-4">
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Project name*"
                    value={projectName}
                    onChange={(e) => {
                      setProjectName(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row my-4">
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setSelectedTech(e.target.value);
                    }}
                    required
                  >
                    <option value="" disabled selected >
                      Choose a Technology
                    </option>
                    {technology.map((tech, index) => {
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
                <div className="col-sm-4">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Deadline (in Days) *"
                    min="1"
                    value={deadline}
                    onChange={(e) => {
                      setDeadline(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col-sm-4">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Project Budget (in INR) *"
                    min={100}
                    value={budget}
                    onChange={(e) => {
                      setBudget(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row my-4">
                <div className="col-sm-8">
                  <textarea
                    className="form-control"
                    placeholder="Project Description*"
                    value={projectDescription}
                    onChange={(e) => {
                      setProjectDescription(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row my-4">
                <div className="col-sm-8">
                  <textarea
                    className="form-control"
                    placeholder="Preferd Qualifications (Seprated with , )"
                    value={preferedQualifications}
                    onChange={(e) => {
                      setpreferedQualification(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row my-4">
                <div className="col-sm-8">
                  <textarea
                    className="form-control"
                    placeholder="Client details (Seprated with , )"
                    value={clientDetails}
                    onChange={(e) => {
                      setClientDetails(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="row my-4">
                <div className="col-sm-8">
                  {load ? (
                    <button className="btn btn-primary w-100 " disabled>
                      <Spinner size="sm" variant="light" />
                    </button>
                  ) : (
                    <button className="btn btn-primary w-100" type="submit">
                      Add Project
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
