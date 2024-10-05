import { useEffect, useState } from "react";
import ViewEnquiryModal from "../layouts/ViewEnquiryModal";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../Firebase";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

export default function ManageEnquiry() {
  const [enquiry, setEnquiry] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    try {
      const q = query(collection(db, "enquiry"), orderBy("createdAt", "asc"));
      onSnapshot(q, (dataObj) => {
        const fetchedData = dataObj.docs.map((el) => {
          return {
            id: el.id,
            data: el.data(),
          };
        });
        setEnquiry(fetchedData);
      });
    } finally {
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    }
  }, []);

  const deleteMessage = async (docId) => {
    try {
      await deleteDoc(doc(db, "enquiry", docId));
      toast.success("Message deleted successfully");
    } catch (err) {
      toast.error("Error deleting message");
    }
  };
  
  const deleteAllMessage = () => {
    if (window.confirm("Are you sure?")) {
      enquiry.forEach(async (el) => {
        try {
          await deleteDoc(doc(db, "enquiry", el.id));
          toast.success("Messages deleted successfully");
        } catch (err) {
          toast.error("Cannot delete messages");
        }
      });
    }
  };
  if (load) {
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
              View or delete<span className="admin-custom-txt"> enquiries</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="container">
        <table className="table  text-center table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {enquiry.map((el, index) => {
            return (
              <tr key={el.id}>
                <td>{index + 1}</td>
                <td>{el.data.email}</td>
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
                        <ViewEnquiryModal
                          enquiry={el}
                          deleteMessage={deleteMessage}
                        />
                      </li>
                      <li>
                        <button
                          className="btn w-100 text-start"
                          onClick={() => {
                            deleteMessage(el.id);
                          }}
                        >
                          Delete Enquiry
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
        <div className="row my-4">
          <div className="col-sm-6 py-3">
            {enquiry.length > 0 ? (
              <button className="btn btn-danger" onClick={deleteAllMessage}>
                Delete all
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
