import { useEffect, useState } from "react";
import EditProjectModal from "../layouts/EditProjectModal";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../Firebase";
import { toast } from "react-toastify";
import ViewProjectDetailsModal from "../layouts/ViewProjectDetailsModal";
import ViewBidsModal from "../layouts/ViewBidsModal";
import { Spinner } from "react-bootstrap";

export default function ManageProject() {
  const [project, setProject] = useState([]);
  const [load,setLoad] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "project"), orderBy("status", "desc"));
    onSnapshot(q, (dataObj) => {
      const fetchedData = dataObj.docs.map((el) => {
        return {
          id: el.id,
          data: el.data(),
        };
      });
      setProject(fetchedData);
    });
  }, []);
  const [technology, setTechnology] = useState([]);
  useEffect(() => {
    try{
      const q = query(collection(db, "technology"), where("status", "==", true));
      onSnapshot(q, (dataObj) => {
      const fetchedData = dataObj.docs.map((el) => {
        return {
          id: el.id,
          data: el.data(),
        };
      });
      setTechnology(fetchedData);
    });
    }finally{
      setTimeout(()=>{setLoad(false)},1000)
    }
  }, []);

  const changeProjectStatus = async (projectId, status) => {
    if (window.confirm("Are you sure you want to disable this project?")) {
      try {
        const docRef = doc(db, "project", projectId);
        await updateDoc(docRef, {
          status: status,
        });
        toast.success("Project status updated successfully");
      } catch {
        toast.error("Error updating data");
      }
    }
  };
  if(load){
    return <Spinner variant="primary" style={{display:"block",margin:"35vh auto", height:"10vh",width:"10vh" }}/>
  }
  return (
    <>
      <div className="container my-5 pt-5">
        <div className="row">
          <div className="col text-center">
            <h1>
              Edit or delete
              <span className="admin-custom-txt"> exsisting projects</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="container">
        <table className="table text-center table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Project Name</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {project.map((el, index) => {
              return (
                <tr key={el.id}>
                  <td>{index + 1}</td>
                  <td>{el.data.projectTitle}</td>
                  {el.data.status === true ? (
                    <>
                      <td>Active</td>
                      <td>
                        <div className="dropdown">
                          <button
                            className="btn btn-primary dropdown-toggle admin-action-dropdown fw-bolder"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            ⋮
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li>
                              <button
                                className="btn w-100 text-start"
                                onClick={() => {
                                  changeProjectStatus(el.id, false);
                                }}
                              >
                                Change Project Status
                              </button>
                            </li>
                            <li>
                                <EditProjectModal
                                  project={el}
                                  projectTech={technology}
                                />
                            </li>
                            <li>
                            <ViewProjectDetailsModal project={el} />
                            </li>
                            <li>
                            <ViewBidsModal project={el}/>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>Inactive</td>
                      <td>
                      <div className="dropdown">
                          <button
                            className="btn btn-primary fw-bolder dropdown-toggle admin-action-dropdown"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            ⋮
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li>
                              <button
                                className="btn w-100 text-start"
                                onClick={() => {
                                  changeProjectStatus(el.id, true);
                                }}
                              >
                                Change Project Status
                              </button>
                            </li>
                            <li>
                                <EditProjectModal
                                  project={el}
                                  projectTech={technology}
                                />
                            </li>
                            <li>
                            <ViewProjectDetailsModal project={el} />
                            </li>
                          </ul>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
