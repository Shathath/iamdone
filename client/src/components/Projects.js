import React from "react";
import "../styles/projects.css";

import { useState } from "react";
import ProjectModal from "./Modals/ProjectModal";
import ProjectBoard from "./ProjectBoard";

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
      <ProjectBoard />
      <ProjectModal />
      {isProjectModalOpen ? (
        <ProjectModal show={isProjectModalOpen} closeModal={openProjectModal} />
      ) : null}
    </main>
  );
}

export default Projects;
