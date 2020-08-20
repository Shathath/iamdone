import React from "react";
import Modal from "react-modal";
import "../styles/taskmodal.css";
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
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          width: "100%",
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
          </div>
          <div className="modal-body">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Task name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Email Address"
                    id="amount"
                  />
                </div>

                <div className="form-group col-md-6">
                  <label>Assignee</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Enter Password"
                    id="spent"
                  />
                </div>

                <div className="form-group col-md-6">
                  <label>Due Date</label>
                  <input type="date" className="form-control" />
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
