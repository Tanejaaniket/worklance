import { useEffect, useState } from "react";
import ViewHistoryModal from "../layout/ViewHistoryModal";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export default function History() {
  const [project, setProject] = useState([]);
  const [load, setLoad] = useState(true);
  const { status,id } = useParams();
  useEffect(() => {
    const q = query(
      collection(db, "bids"),
      where("status", "==", Number(status)),
      where("userId", "==", id)
    );
    onSnapshot(q, (dataObj) => {
      try {
        const fetchedData = dataObj.docs.map((el) => {
          return {
            id: el.id,
            data: el.data(),
          };
        });
        setProject(fetchedData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setTimeout(() => {
          setLoad(false);
        }, 1000);
      }
    });
  }, []);
  if (load) {
    return (
      <Spinner
        style={{
          display: "block",
          margin: "35vh auto",
          height: "10vh",
          width: "10vh",
          borderColor: "#92d35e",
          borderRightColor: "transparent",
        }}
      />
    );
  }
  return (
    <>
          <div className="row mt-3 ">
        <div className="col ps-sm-5 ps-3">
          <Link
            className="btn me-auto custom-btn "
            to={`/profile/${id}`}
          >
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>
      </div>
      <div className="p-sm-5 p-2 pt-3">
        <h1 className="text-center">
          Hist<span className="custom-txt">ory</span>
        </h1>
        <p className="text-center">
          View all your current assigned projects and past projects here
        </p>
      </div>
      <div className="container">
        <table className="table text-center table-striped">
          <thead>
            {project.length == 0 ? (
              <tr>
                <th scope="col">No record found</th>
              </tr>
            ) : (
              <tr>
                <th scope="col">#</th>
                <th scope="col">Project Name</th>
                <th scope="col">Bid amount</th>
                <th scope="col">Actions</th>
              </tr>
            )}
          </thead>
          <tbody>
            {project.map((el, index) => {
              return (
                <tr key={el.id}>
                  <td>{index + 1}</td>
                  <td>{el.data.projectTitle}</td>
                  <td>{el.data.bidAmount} INR</td>
                  {el.data.status === true ? (
                    <>
                      <td>
                        <ViewHistoryModal bids={el} />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <ViewHistoryModal bids={el} />
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
