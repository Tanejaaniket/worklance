import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, Form, Modal, ProgressBar } from "react-bootstrap";
import { db, storage } from "../../../Firebase";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function EditTechnologyModal({ tech }) {
  const [show, setShow] = useState(0);
  const [techName, setTech] = useState(tech?.data?.technologyName);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState({});
  const [progress, setProgress] = useState(0);
  const handleClose = () => setShow(0);
  const handleShow = () => {
    setShow(1);
  };
  const saveData = async (url = "") => {
    setProgress(0);
    try {
      let data;
      if (url) {
        data = {
          ...tech.data,
          technologyName: techName,
          technologyIcon: url,
        };
      } else {
        data = {
          ...tech.data,
          technologyName: techName,
        };
      }
      await setDoc(doc(db, "technology", tech.id), data);
      toast.success("Data editted successfully");
      setFile({});
      setFileName("");
      setShow(0);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      if (fileName) {
        const storageRef = ref(storage, `technology/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setProgress(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error.message);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                saveData(downloadURL);
              }
            );
          }
        );
      } else {
        saveData();
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <button className="btn text-start w-100" onClick={handleShow}>
        Edit technology
      </button>

      <Modal show={Boolean(show)} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit technology</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleForm}>
            <div className="row justify-content-center">
              <div className="col">
                <div className="row-my-4">
                  <div className="col-sm">
                    <img
                      src={tech?.data?.technologyIcon}
                      className="edit-project-modal-img"
                      alt={techName}
                    ></img>
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Category name*"
                      value={techName}
                      onChange={(e) => {
                        setTech(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm">
                    <input
                      className="form-control"
                      type="file"
                      placeholder="Icon link*"
                      value={fileName}
                      onChange={(e) => {
                        setFileName(e.target.value);
                        setFile(e.target.files[0]);
                      }}
                    />
                    {progress ? <ProgressBar animated now={progress} /> : ""}
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
