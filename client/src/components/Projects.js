import React from "react";
import "../styles/projects.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProjectModal from "./Modals/ProjectModal";

function Projects() {
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const openProjectModal = () => {
    setProjectModalOpen(!isProjectModalOpen);
  };
  return (
    <main>
      <button className="inner-button" onClick={openProjectModal}>
        Add New Projects
      </button>
      {isProjectModalOpen ? (
        <ProjectModal show={isProjectModalOpen} closeModal={openProjectModal} />
      ) : null}
    </main>
  );
}

export default Projects;
