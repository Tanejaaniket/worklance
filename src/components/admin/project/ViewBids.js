
import ViewBidsModal from "../layouts/ViewBidsModal";


export default function ViewBids() {
  return (
    <>
      <div className="container my-5 pt-5">
        <div className="row mb-3">
          <div className="col text-center">
            <h1>
              View bids on<span className="admin-custom-txt"> the project</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col offset-sm-3">
            <div className="row my-4">
              <div className="col-sm-6 py-3">
                <h5>Project Title 1</h5>
              </div>
              <div className="col-sm-2 my-3 d-sm-flex d-block justify-content-around">
              <ViewBidsModal/>
              </div>
            </div>
            <div className="row my-4">
              <div className="col-sm-6 py-3">
                <h5>Project Title 2</h5>
              </div>
              <div className="col-sm-2 my-3 d-sm-flex d-block justify-content-around">
              <ViewBidsModal/>
              </div>
            </div>
            <div className="row my-4">
              <div className="col-sm-6 py-3">
                <h5>Project Title 3</h5>
              </div>
              <div className="col-sm-2 my-3 d-sm-flex d-block justify-content-around">
              <ViewBidsModal/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
