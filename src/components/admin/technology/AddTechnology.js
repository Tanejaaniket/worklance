import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../../../Firebase";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ProgressBar, Spinner } from "react-bootstrap";
export default function AddTechnology() {
  const [technologyName, setTechnology] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState({});
  const [progress, setProgress] = useState(0);
  const [load, setLoad] = useState(false);
  const [mainLoad, setMainLoad] = useState(true);
  useEffect(() => {
      setTimeout(() => {
        setMainLoad(false);
      }, 1000);
  },[])
  const saveData = async (url) => {
    setProgress(0);
    try {
      const data = {
        technologyName: technologyName,
        technologyIcon: url,
        createdAt: Timestamp.now(),
        status: true,
      };
      await addDoc(collection(db, "technology"), data);
      toast.success("Technology added successfully");
      setTechnology("");
      setFileName("");
      setFile({});
    } catch (err) {
      toast.error("Cannot save data");
    }
  };
  const addTechnology = async (e) => {
    setLoad(true)
    e.preventDefault();
    try {
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
          toast.error("Error uploading image");
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            saveData(downloadURL);
          });
        }
      );
    }finally {
      setTimeout(() => {
        setLoad(false);
      }, 2000);
    }
  };
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
              Add <span className="admin-custom-txt">new technology</span> for
              the projects
            </h1>
          </div>
        </div>
      </div>
      <div className="container">
        <form onSubmit={addTechnology}>
          <div className="row">
            <div className="col offset-sm-3">
              <div className="row my-4">
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Technology name*"
                    value={technologyName}
                    onChange={(e) => {
                      setTechnology(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row my-4">
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="file"
                    placeholder="Icon link*"
                    value={fileName}
                    onChange={(e) => {
                      setFileName(e.target.value);
                      setFile(e.target.files[0]);
                    }}
                    required
                  />
                  {
                    progress?(
                      <ProgressBar animated now={progress} />
                    ):("")
                  }
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
                      Add Technology
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
