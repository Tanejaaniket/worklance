import { Fragment, useEffect, useState } from "react";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../Firebase";
import { toast } from "react-toastify";
import EditTechnologyModal from "../layouts/EditTechnologyModal";
import { Spinner } from "react-bootstrap";

export default function ManageTechnology() {
  const [technology, setTechnology] = useState([]);
  const [load,setLoad] = useState(true);
  useEffect(() => {
    try{
      const q = query(collection(db, "technology"), orderBy("createdAt", "desc"));
    onSnapshot(q, (dataObj) => {
      const fetchedData = dataObj.docs.map((el) => {
        return {
          id: el.id,
          data: el.data(),
        };
      });
      setTechnology(fetchedData);
    });
    }catch(err){
      console.log(err.message);
    }finally{
      setTimeout(()=>{setLoad(false)},1000)
    }
  }, []);

  const changeTechnologyStatus = async (projectId, status) => {
    if (
      window.confirm(
        "Are you sure you want to change status of this technology?"
      )
    ) {
      try {
        const docRef = doc(db, "technology", projectId);
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
              <span className="admin-custom-txt"> existing technology</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="container text-center">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Technology Name</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {technology.map((tech, index) => {
              return (
                <tr key={tech.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{tech.data.technologyName}</td>
                  {tech.data.status === true ? (
                    <>
                      <td>
                        Active
                      </td>
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
                                  changeTechnologyStatus(tech.id, false);
                                }}
                              >
                                Change Technology Status
                              </button>
                            </li>
                            <li>
                            <EditTechnologyModal tech={tech} />
                            </li>
                          </ul>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        Inactive
                      </td>
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
                                  changeTechnologyStatus(tech.id, true);
                                }}
                              >
                                Change Technology Status
                              </button>
                            </li>
                            <li>
                            <EditTechnologyModal tech={tech} />
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
