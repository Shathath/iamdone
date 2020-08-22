import React from "react";
import Modal from "react-modal";
import "../../styles/projects.css";
import axios from "axios";
import { useState } from "react";

function ProjectModal({ show, closeModal }) {
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState(false);
  const sumbitData = (e) => {
    e.preventDefault();

    var config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    var data = {
      projectTitle: projectName,
    };

    axios
      .post("http://localhost:5000/createproject", data, config)
      .then((response) => {
        console.log(response.data);
        closeModal();
      })
      .catch((error) => {
        setError(error.message);
      });
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
          borderRadius: "4px",
          outline: "none",
          width: "30%",
          height: "250px",
          fontFamily: "Raleway , sans-serif",
          margin: "0 auto",
          padding: "20px",
        },
      }}
    >
      <div className="container">
        <form>
          <div className="form-group">
            <h3 style={{ textAlign: "center", display: "inline" }}>
              New Project
            </h3>
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
          {error && <p>{error}</p>}
          <div className="form-group">
            <label className="label imp" style={{ fontWeight: "bold" }}>
              Project Name
            </label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="" className="btn btn-primary" onClick={sumbitData}>
              Create
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ProjectModal;
