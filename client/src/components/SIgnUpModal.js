import React from "react";
import Modal from "react-modal";

function SignUpModal({ show }) {
  const labelStyle = {
    fontWeight: "bold",
  };
  return (
    <Modal
      isOpen={show}
      style={{
        content: {
          position: "absolute",
          top: "100px",
          left: "40px",
          right: "40px",
          bottom: "40px",
          border: "1px solid #f2f2f2",
          boxShadow: "2px 2px 10px #f2f2f2",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          width: "30%",
          height: "500px",
          fontFamily: "Raleway , sans-serif",

          margin: "0 auto",
          padding: "20px",
        },
      }}
    >
      <div className="container">
        <form>
          <div className="form-group">
            <h5>Login In</h5>
          </div>
          <div className="form-group">
            <label className="labels" style={{ fontWeight: "bold" }}>
              UserName or Email
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Username or Email"
            />
          </div>
          <div className="form-group">
            <label className="labels" style={{ labelStyle }}>
              Password
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Password"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default SignUpModal;
