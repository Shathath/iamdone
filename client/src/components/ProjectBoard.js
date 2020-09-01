import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../styles/projects.css";
function ProjectBoard() {
  const [projects, setProjects] = useState([]);
  const [options, setOptions] = useState(false);
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(false);
  const [loader, setLoader] = useState(false)

  const showOptions = (index) => {
    setOptions(!options);
    setSelected(index);
  };

  useEffect(() => {

    axios.get("http://localhost:5000/getprojects").then((response) => {
      //    console.log(response.data.projects);
      setLoader(true)
      setProjects(response.data.projects);
      setLoader(false)
      //console.log(projects);
    });
  }, []);

  return (
    <div className="container-fluid">
      {loader && <p>Hey Loadeing</p>}
      {loader ? <div class="spinner-border text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div> :
        <div className="row justify-content-center">
          {projects.length > 0 &&
            projects.map((value, index) => {
              console.log(options, selected, index);
              return (
                <div className="col-md-2 project-card">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-dots icons"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#9E9E9E"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style={{ float: "right" }}
                    onClick={() => showOptions(index)}
                    id={index + 1}
                    value="name"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="5" cy="12" r="1" />
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                  </svg>

                  {options && selected === index ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-archive project-delete"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#607D8B"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x="3" y="4" width="18" height="4" rx="2" />
                        <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
                        <line x1="10" y1="12" x2="14" y2="12" />
                      </svg>
                    </>
                  ) : (
                      <React.Fragment>
                        <div className="project-card-header">+ Add</div>
                        <div className="project-card-title">{value.title}</div>
                      </React.Fragment>
                    )}
                </div>
              );
            })}
        </div>}
    </div>
  );
}
export default ProjectBoard;
