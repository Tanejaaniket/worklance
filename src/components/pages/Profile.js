import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../Firebase";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Spinner } from "react-bootstrap";
//?0->pending 1->assigned 2->completed
export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [history1, setHistory1] = useState([]);
  const [history2, setHistory2] = useState([]);
  const [status, setStatus] = useState("");
  const [about, setAbout] = useState();
  const [contact, setContact] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [url, setURL] = useState();
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("");
  const [load, setLoad] = useState(true);
  const nav = useNavigate();
  useEffect(() => {
    try {
      fetchProfile();
    } catch (error) {
      console.log(error.message);
    } finally {
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    }
  }, [status]);
  async function fetchProfile() {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUser(docSnap.data());
    } else {
      console.log("No such document!");
    }
    const q1 = query(
      collection(db, "bids"),
      where("userId", "==", id),
      where("status", "==", 1)
    );

    const querySnapshot1 = await getDocs(q1);
    const fetchedData1 = [];
    querySnapshot1.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      fetchedData1.push(doc.data());
    });
    setHistory1(fetchedData1);

    const q2 = query(
      collection(db, "bids"),
      where("userId", "==", id),
      where("status", "==", 2)
    );
    const querySnapshot2 = await getDocs(q2);
    const fetchedData2 = [];
    querySnapshot2.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      fetchedData2.push(doc.data());
    });
    setHistory2(fetchedData2);
  }
  const editData = () => {
    setAbout(user.about);
    setUserName(user.userName);
    setAddress(user.address);
    setEmail(user.email);
    setContact(user.contact);
    setStatus("editting");
  };
  const addProfilePic = async () => {
    if (!fileName) {
      saveCredential();
    } else {
      try {
        const storageRef = ref(storage, `profile/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
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
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setURL(downloadURL);
              //saveCredential();
            });
          }
        );
      } catch (err) {
        toast.error("Something went wrong");
      }
    }
  };
  useEffect(() => {
    try {
      if (!!url) {
        saveCredential();
      }
    } finally {
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    }
  }, [url]);
  const saveCredential = async () => {
    try {
      let data;
      if (url) {
        data = {
          ...user,
          contact,
          address,
          email,
          userName,
          about,
          url,
        };
      } else {
        data = {
          ...user,
          contact,
          address,
          email,
          userName,
          about,
        };
      }
      await updateDoc(doc(db, "users", id), data);
      toast.success("Profile updated successfully");
      sessionStorage.setItem("name", userName);
      sessionStorage.setItem("email", email);
      setStatus("");
      setFile({});
      setFileName("");
    } catch (err) {
      toast.error("Cannot save data");
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    }
  };
  const saveData = async (e) => {
    e.preventDefault();
    setLoad(true);
    addProfilePic();
  };
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
      <div className="container profile-page">
        {status != "editting" ? (
          <div className="row mt-3">
            <div className="col">
              <Link className="btn me-auto custom-btn mb-3" to={`/`}>
                <i className="bi bi-arrow-left"></i>
              </Link>
              <button
                className="btn d-block me-auto custom-btn "
                onClick={editData}
              >
                <i className="bi bi-pencil"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className="row mt-3">
            <div className="col">
              <a
                className="d-block me-auto text-black"
                onClick={() => {
                  setStatus("");
                }}
              >
                <i className="bi bi-x fs-3"></i>
              </a>
            </div>
          </div>
        )}
        <form onSubmit={saveData}>
          <div className="row">
            <div className="col my-5">
              <div className="row  align-items-center ">
                <div className="col-lg-9 mb-5 ">
                  <h4>About me</h4>
                  {status == "editting" ? (
                    <>
                      <textarea
                        className="form-control fs-5"
                        value={about}
                        onChange={(e) => {
                          setAbout(e.target.value);
                        }}
                      ></textarea>
                    </>
                  ) : (
                    <p className="fs-5">{user.about}</p>
                  )}
                </div>
                <div className="col-lg-3 mb-5 ">
                  <img
                    src={
                      user.url ||
                      "https://firebasestorage.googleapis.com/v0/b/worklance-5a84c.appspot.com/o/profile%2FUser-avatar.png?alt=media&token=97885754-a1f3-4312-8a79-d7498bb949d1"
                    }
                    className="profile-img "
                  />
                  {status == "editting" ? (
                    <>
                      <input
                        id="ip-file"
                        type="file"
                        className="form-control"
                        onChange={(e) => {
                          setFileName(e.target.value);
                          setFile(e.target.files[0]);
                        }}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="row py-3 fs-5  border-bottom profile-strip-color">
                    <div className="col-lg-3 col-md-5 fw-bold">Username</div>
                    {status == "editting" ? (
                      <div className="col-md-7">
                        <input
                          className="form-control fs-5"
                          type="text"
                          value={userName}
                          onChange={(e) => {
                            setUserName(e.target.value);
                          }}
                          required
                        />
                      </div>
                    ) : (
                      <p className="fs-5 col-md-7">{user.userName}</p>
                    )}
                  </div>
                  <div className="row py-3 fs-5  border-bottom">
                    <div className="col-lg-3 col-md-5 fw-bold">Contact</div>
                    {status == "editting" ? (
                      <div className="col-md-7">
                        <input
                          className="form-control fs-5"
                          type="number"
                          min={1000000000}
                          max={9999999999}
                          value={contact}
                          onChange={(e) => {
                            setContact(e.target.value);
                          }}
                          required
                        />
                      </div>
                    ) : (
                      <p className="fs-5 col-md-7">{user.contact}</p>
                    )}
                  </div>
                  <div className="row py-3 fs-5 border-bottom profile-strip-color">
                    <div className="col-lg-3 col-md-5 fw-bold ">
                      Email(For contact)
                    </div>
                    {status == "editting" ? (
                      <div className="col-md-7">
                        <input
                          className="form-control fs-5"
                          type="text"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          required
                        />
                      </div>
                    ) : (
                      <p className="fs-5 col-md-7">{user.email}</p>
                    )}
                  </div>
                  <div className="row py-3 fs-5  border-bottom">
                    <div className="col-lg-3 col-md-5 fw-bold">Address</div>
                    {status == "editting" ? (
                      <div className="col-md-7">
                        <input
                          className="form-control fs-5"
                          type="text"
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          required
                        />
                      </div>
                    ) : (
                      <p className="fs-5 col-md-7">{user.address}</p>
                    )}
                  </div>
                  <div className="row py-3 fs-5 border-bottom profile-strip-color">
                    <div className="col-lg-3 col-md-5 fw-bold ">
                      Projects Assigned
                    </div>
                    <div className="col-md-7">
                      <p className="fs-5">{history1.length}</p>
                      <button
                        className="btn custom-btn"
                        onClick={() => {
                          nav(`/history/${id}/${1}`);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="row py-3 fs-5 border-bottom ">
                    <div className="col-lg-3 col-md-5 fw-bold">
                      Projects Completed
                    </div>
                    <div className="col-md-7">
                      <p className="fs-5">{history2.length}</p>
                      <button
                        className="btn custom-btn"
                        onClick={() => {
                          nav(`/history/${id}/${2}`);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  {status == "editting" ? (
                    <div className="row py-3">
                      <div className="col text-center">
                        <button className="btn custom-btn" type="submit">
                          Save changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    " "
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
