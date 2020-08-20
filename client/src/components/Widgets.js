import React, { useState } from "react";
import "../styles/widget.css";
import TaskModal from "./TaskModal";
function Widgets() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <React.Fragment>
      <div className="outer-wrapper">
        <button className="inner-button" onClick={() => setOpenModal(true)}>
          + Add New Task
        </button>
      </div>
      {openModal && <TaskModal show={openModal}></TaskModal>}
    </React.Fragment>
  );
}

export default Widgets;
