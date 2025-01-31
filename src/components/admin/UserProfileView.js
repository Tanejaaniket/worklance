import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { Spinner } from "react-bootstrap";
//?0->pending 1->assigned 2->completed
export default function UserProfileView() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [history1, setHistory1] = useState([]);
  const [history2, setHistory2] = useState([]);
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
  }, []);
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
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, []);

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
        <div className="row mt-3 ">
            <div className="col ps-sm-5 ps-3">
              <Link
                className="btn me-auto btn-primary "
                to={`/admin/manageproject`}
              >
                <i className="bi bi-arrow-left"></i>
              </Link>
            </div>
          </div>
      <div className="container profile-page">
        <div className="row">
          <div className="col my-5">
            <div className="row  align-items-center ">
              <div className="col-lg-9 mb-5 ">
                <h4>About me</h4>
                <p className="fs-5">{user.about}</p>
              </div>
              <div className="col-lg-3 mb-5 ">
                <img src={user.url} className="profile-img " />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="row py-3 fs-5  border-bottom profile-strip-color">
                  <div className="col-lg-3 col-md-5 fw-bold">Username</div>

                  <p className="fs-5 col-md-7">{user.userName}</p>
                </div>
                <div className="row py-3 fs-5  border-bottom">
                  <div className="col-lg-3 col-md-5 fw-bold">Contact</div>
                  <p className="fs-5 col-md-7">{user.contact}</p>
                </div>
                <div className="row py-3 fs-5 border-bottom profile-strip-color">
                  <div className="col-lg-3 col-md-5 fw-bold ">
                    Email(For contact)
                  </div>
                  <p className="fs-5 col-md-7">{user.email}</p>
                </div>
                <div className="row py-3 fs-5  border-bottom">
                  <div className="col-lg-3 col-md-5 fw-bold">Address</div>
                  <p className="fs-5 col-md-7">{user.address}</p>
                </div>
                <div className="row py-3 fs-5 border-bottom profile-strip-color">
                  <div className="col-lg-3 col-md-5 fw-bold ">
                    Projects Assigned
                  </div>
                  <div className="col-md-7">
                    <p className="fs-5">{history1.length}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        nav(`/admin/history/${id}/${1}`);
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
                      className="btn btn-primary"
                      onClick={() => {
                        nav(`admin/history/${id}/${2}`);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
