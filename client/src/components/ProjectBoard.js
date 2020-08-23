import React, { useEffect, useState } from "react";
import axios from "axios";
function ProjectBoard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/getprojects").then((response) => {
      console.log(response.data.projects);
      setProjects(response.data.projects);
      //console.log(projects);
    });
  }, []);
  console.log(projects);
  return (
    <div className="container">
      <div className="row">
        {projects.length > 0 &&
          projects.map((value, index) => {
            return <div className="col-md-3 project-card">{value.title}</div>;
          })}
      </div>
    </div>
  );
}
export default ProjectBoard;
