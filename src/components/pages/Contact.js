import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../Firebase";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  let name = sessionStorage.getItem("name");
  name = name.split(" ");
  let fName = name[0];
  let lName = name[1]==undefined?"":name[1];
  const email = sessionStorage.getItem("email")
  const [subject,setSubject] = useState('');
  const [message,setMessage] = useState('');
  const nav = useNavigate()

  const handleEnquiry =async (e)=>{
    e.preventDefault();
    console.log(fName,lName,email,subject,message);
    try{
      const data = {
        name:fName+" "+lName,
        email:email,
        subject:subject,
        message:message,
        createdAt:Timestamp.now(),
        status:true
      }
      await addDoc(collection(db,"enquiry"),data);
      toast.success("Message sent successfully");
      setSubject('');
      setMessage('');

    }catch(err){
      toast.error("Something went wrong");
    }
  }
  const [load,setLoad] = useState(true);
  setTimeout(()=>{setLoad(false)},500)
  if(load){
    return <Spinner style={{display:"block",margin:"35vh auto", height:"10vh",width:"10vh",borderColor:"#92d35e",borderRightColor:"transparent"}}/>
  }
  return (
    <>
      <main>
        <div className="container my-5 pt-5">
          <div className="row">
            <div className="col text-center">
              <h1>
                Please <span className="custom-txt">let us know</span> if you
                have any questions
              </h1>
              <p className="text-muted">We're here to help! If you have any questions or need clarification on our services, feel free to reach out to us below.</p>
            </div>
          </div>
        </div>
        <div className="container pb-5">
          <form onSubmit={handleEnquiry}>
            <div className="row">
              <div className="col offset-sm-3">
                <div className="row my-4">
                  <div className="col-sm-4">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="First Name*"
                      value={fName}
                      disabled
                    />
                  </div>
                  <div className="col-sm-4">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Last Name (Optional)"
                      value={lName}
                      disabled
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email*"
                      value={email}
                      disabled
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Subject*"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm-8">
                    <textarea
                      className="form-control"
                      placeholder="Leave a message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-sm-8">
                    <button className="btn custom-btn w-100" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
