import React, { useState } from "react";
import "../styles/widget.css";
import TaskModal from "./Modals/TaskModal";
function Widgets() {
  const [openModal, setOpenModal] = useState(false);

  const modalhanlder = () => {
    setOpenModal(!openModal);
  };
  return (
    <React.Fragment>
      <div className="outer-wrapper">
        <button className="inner-button" onClick={modalhanlder}>
          + Add New Task
        </button>
      </div>
      {openModal && (
        <TaskModal show={openModal} closeModal={modalhanlder}></TaskModal>
      )}
    </React.Fragment>
  );
}

export default Widgets;
