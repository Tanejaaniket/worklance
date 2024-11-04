import {
  addDoc,
  collection,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../Firebase";
import { toast } from "react-toastify";

export default function Project({ tech, searchQuery, setSearchQuery }) {
  const [project, setProject] = useState([]);
  const [sidebar, setSidebar] = useState(-1);
  const [searchProject, setSearchProject] = useState([]);

  useEffect(() => {
    let q;
    if (!tech) {
      q = query(collection(db, "project"), where("status", "==", true));
    } else {
      q = query(
        collection(db, "project"),
        where("technologyName", "==", tech),
        where("status", "==", true)
      );
    }
    onSnapshot(q, (dataObj) => {
      const fetchedData = dataObj.docs.map((el) => {
        return {
          id: el.id,
          data: el.data(),
        };
      });
      setProject(fetchedData);
    });
  }, [tech]);
  useEffect(() => {
    if (searchQuery) {
      setSearchProject(
        project.filter((value, index) => {
          return (
            value.data.projectTitle.includes(searchQuery) ||
            value.data.description.includes(searchQuery)
          );
        })
      );
    }
  }, [searchQuery]);
  return (
    <>
      {searchQuery ? (
        <>
          <div className="text-end">
            <i
              className="bi bi-x fs-2"
              onClick={() => {
                setSearchQuery("");
                setSearchProject([]);
              }}
            />
          </div>
          {searchProject.length == 0 ? (
            <div className="alert alert-danger w-50 mx-auto">
              <i className="bi bi-exclamation-triangle"></i> No projects found
              for your search try other projects on our platform.
            </div>
          ) : (
            " "
          )}
        </>
      ) : (
        ""
      )}
      {searchProject.length != 0 ? (
        <div className="container description-container">
          <div className="row justify-content-around">
            {searchProject.map((el, index) => {
              return (
                <Fragment key={el.id}>
                  <div className="col-md-5 border  mb-3 py-3 text-center">
                    <h3>{el.data.projectTitle}</h3>
                    <p className="description">
                      <b>Details: </b>
                      {el.data.description}
                    </p>
                    <p>
                      <i className="bi bi-clock" /> {el.data.approxTime} days
                    </p>
                    <p>
                      <i className="bi bi-currency-rupee" /> {el.data.budget}
                    </p>
                    <ProjectSidebar
                      project={el}
                      sidebar={sidebar === index}
                      setSidebar={setSidebar}
                      index={index}
                    />
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      ) : project.length != 0 ? (
        <div className="container description-container">
          {tech ? (
            <h1 className=" heading text-center py-5" id="project">
              Projects based on{" "}
              <span className="custom-txt">{tech}</span>
            </h1>
          ) : (
            ""
          )}
          <div className="row justify-content-around px-sm-0 px-1">
            {project.map((el, index) => {
              return (
                <Fragment key={el.id}>
                  <div className="col-md-5 border mb-2 py-3 text-center">
                    <h3>{el.data.projectTitle}</h3>
                    <p className="description">
                      <b>Details: </b>
                      {el.data.description}
                    </p>
                    <p>
                      <i className="bi bi-clock" /> {el.data.approxTime} days
                    </p>
                    <p>
                      <i className="bi bi-currency-rupee" /> {el.data.budget}
                    </p>
                    <ProjectSidebar
                      project={el}
                      sidebar={sidebar === index}
                      setSidebar={setSidebar}
                      index={index}
                    />
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="alert alert-danger w-50 mx-auto">
          <i className="bi bi-exclamation-triangle"></i> No Projects Found
        </div>
      )}
    </>
  );
}
function ProjectSidebar({ project, sidebar, setSidebar, index }) {
  const [userBids, setUserBids] = useState([]);
  const id = sessionStorage.getItem("id");
  useEffect(() => {
    const q = query(
      collection(db, "bids"),
      where("status", "==", 0),
      where("userId", "==", id),
      where("projectId", "==", project.id)
    );
    onSnapshot(q, (dataObj) => {
      try {
        const fetchedData = dataObj.docs.map((el) => {
          return {
            id: el.id,
            data: el.data(),
          };
        });
        setUserBids(fetchedData);
      } catch (error) {
        console.log(error.message);
      }
    });
  }, []);
  const [qualities, setQualities] = useState("");
  const [bid, setBid] = useState("");
  let username = sessionStorage.getItem("name");
  const saveBids = async (e) => {
    e.preventDefault();
    try {
      const data = {
        userId: id,
        projectId: project.id,
        projectTitle: project.data.projectTitle,
        userName: username,
        bidAmount: bid,
        timeRequired: project.data.approxTime,
        status: 0,
        createdAt: Timestamp.now(),
      };
      await addDoc(collection(db, "bids"), data);
      toast.success(`Bid sent successfully`);
      setBid("");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    setQualities(project.data.qualifications);
  }, [project.data.qualifications]);
  let q = qualities.split(",");
  const hideDescription = () => {
    setSidebar(-1);
  };
  const showDescription = () => {
    setSidebar(index);
  };
  const formatDate = (date) => {
    let x = date.toDate().toString();
    x = x.split(" ");
    return x[0] + " " + x[1] + " " + x[2];
  };

  return (
    <>
      <button className="btn custom-btn" onClick={showDescription}>
        View details
      </button>
      <div
        className={
          sidebar
            ? "sidebar description-container text-start"
            : "sidebar description-container d-none"
        }
      >
        <button className="btn custom-btn py-0" onClick={hideDescription}>
          <i className="bi bi-arrow-left-short fs-3"></i>
        </button>
        {/* Project description sidebar */}
        <div className="container mb-5">
          <div className="row">
            <div className="col">
              <h2 className="description-heading">
                {project.data.projectTitle}
              </h2>
              <p className="fs-5">
                <b>Details: </b>
                {project?.data?.description}
              </p>
              <h2 className="description-heading">Prefered Qualities</h2>
              <ul className="fs-5">
                {q.map((el, index) => {
                  return <li key={index}>{el}</li>;
                })}
              </ul>
              <div className="fs-5">
                <h2 className="description-heading">Deadlines and Budget</h2>
                <p>
                  <i className="bi bi-clock" /> {project?.data?.approxTime} days
                </p>
                <p>
                  <i className="bi bi-currency-rupee" /> {project?.data?.budget}{" "}
                  INR
                </p>
              </div>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              saveBids(e);
              hideDescription();
            }}
          >
            <div className="row">
              <div className="col-sm-5">
                <h2 className="description-heading">Enter your bid</h2>
                {id ? (
                  <>
                    <div className="input-group">
                      <input
                        type="number"
                        placeholder="Enter your bid*"
                        className="form-control"
                        min="1"
                        max={project?.data?.budget}
                        value={bid}
                        onChange={(e) => setBid(e.target.value)}
                      />
                      <button className="btn custom-btn" type="submit">
                        Apply
                      </button>
                    </div>
                    <h2 className="description-heading">Your bid history</h2>
                    <div className="container">
                    {userBids.length!==0?(
                      <table className="table text-center table-striped">
                      <thead>
                        <tr>
                          <th>Bid Amount</th>
                          <th>Applied on</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                        userBids.map((el) => {
                          return (
                            <tr key={el.id}>
                              <td>{el.data.bidAmount}</td>
                              <td>{formatDate(el.data.createdAt)}</td>
                            </tr> 
                          );
                        })}
                      </tbody>
                    </table>
                    ):(
                      <p className="fs-5">No bids found</p>
                    )}
                      
                    </div>
                  </>
                ) : (
                  <div className="alert alert-danger">
                    <i className="bi bi-exclamation-triangle"></i>{" "}
                    <Link
                      to="/login"
                      className="text-decoration-none text-black alert-link"
                    >
                      Log in to apply
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
