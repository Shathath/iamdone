import React from "react";
import Modal from "react-modal";
import "../styles/taskmodal.css";
import Select from "react-select";
function TaskModal({ show, closeModal }) {
  return (
    <Modal
      isOpen={show}
      style={{
        content: {
          position: "absolute",
          top: "40px",
          left: "40px",
          right: "40px",
          bottom: "40px",
          border: "1px solid #fff",
          backgroundColor: "transparent",
          overflow: "auto",
          fontFamily: "Raleway,open-sans",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          width: "80%",
          margin: "0 auto",
          padding: "20px",
        },
        overlay: {},
      }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add New Task
            </h5>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-square-x icons"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="#000000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              style={{ float: "right" }}
              onClick={() => closeModal()}
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M10 10l4 4m0 -4l-4 4" />
            </svg>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="imp">Task name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="TaskName"
                    id="amount"
                  />
                </div>

                <div className="form-group col-md-6">
                  <label className="imp">Assigned To</label>
                  {/* <input
                    className="form-control"
                    type="password"
                    placeholder=""
                    id="spent"
                  /> */}
                  <Select
                    defaultValue={["Rahman", "shathath"]}
                    isMulti
                    name="colors"
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>

                <div className="form-group col-md-6">
                  <label className="imp">Projects</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder=""
                    id="spent"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="imp">Tags</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder=""
                    id="spent"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter Description"
                  />
                </div>
              </div>
            </form>
          </div>
          {/* footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              Create
            </button>
          </div>
          {/* footer */}
        </div>
      </div>
    </Modal>
  );
}

export default TaskModal;
