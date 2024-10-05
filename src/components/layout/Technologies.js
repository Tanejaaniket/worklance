import { db } from "../../Firebase";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Project from "./Projects";


export default function Technologies() {
  const [technology, setTechnology] = useState([]);
  const [techs, setTech] = useState("");
  let tempArray = [];
  let finalArray = [];
  useEffect(() => {
    const q = query(collection(db, "technology"), where("status", "==", true));
    onSnapshot(q, (dataObj) => {
      const fetchedData = dataObj.docs.map((el) => {
        return {
          id: el.id,
          data: el.data(),
        };
      });
      setTechnology(fetchedData);
      console.log(fetchedData);
      
    });
  }, []);
  for (let i = 0; i < technology.length; i++) {
    tempArray = [technology[i]];
    i++
    while(i%4!==0 && technology[i] !== undefined){
      tempArray.push(technology[i]);
      i++;
    }
    finalArray.push(tempArray);
    console.log("final array",finalArray);
    
  }
  return (
    <>

      <div
        className="container-fluid text-center carousel slide"
        id="carouselExample"
      >
        <div className="container carousel-inner">
          {finalArray.map((subArray, index) => {
            if (index == 0) {
              return (
                <div className="carousel-item active" key={index}>
                  <div className="row">
                    {subArray.map((tech, index) => {
                        return (
                          <div className="col-md-3 my-5" key={tech.id}>
                            <div className="card py-3 technology-card mx-auto"  onClick={()=>{
                            setTech(tech.data.technologyName)    
                          }}>
                              <img
                                src={tech.data.technologyIcon}
                                className="card-img-top my-4 "
                                alt=""
                              />
                              <h3 className="card-title mt-4">{tech.data.technologyName}</h3>
                            </div>
                          </div>
                        );
                    })}
                  </div>
                </div>
              );
            } else {
              return (
                <div className="carousel-item" key={index}>
                  <div className="row">
                  {subArray.map((tech, index) => {
                      if(tech!=undefined){
                        return (
                          <div className="col-md-3 my-5" key={tech.id}>
                            <div className="card py-3 technology-card mx-auto"  onClick={()=>{
                            setTech(tech.data.technologyName)    
                          }}>
                              <img
                                src={tech.data.technologyIcon}
                                className="card-img-top my-4 "
                                alt=""
                              />
                              <h3 className="card-title mt-4">{tech.data.technologyName}</h3>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="container">
          <a
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <img src="/assets/img/icon/prew-arrow.svg" alt="" />
          </a>
          <a
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <img src="/assets/img/icon/next-arrow.svg" alt="" />
          </a>
        </div>
      </div>
      {
        techs?(
          <>
          <div className="text-end">
            <i className="bi bi-x fs-2" onClick={()=>{setTech("")}}></i>
          </div>
          <Project tech={techs}/>
          </>
        ):("")
      }
    </>
  );
}
