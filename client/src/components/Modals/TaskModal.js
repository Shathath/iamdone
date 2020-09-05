import React, { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import "../../styles/taskmodal.css";
import Select from "react-select";
import axios from "axios";

import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';


import SimpleStaticToolbarEditor from "../RichText/Editor";




function TaskModal({ show, closeModal }) {
  const [editorState,setEditorState] = useState(createEditorStateWithText(''))
  const [projects, setProjects] = useState([]);
  
  



  useEffect(() => {
    axios.get("http://localhost:5000/getprojects").then((response) => {
      const options = [];
      const { projects } = response.data;

      projects.forEach((value, index) => {
        const setOptions = {
          value: value._id,
          label: value.title,
        };

        options.push(setOptions);
        setProjects(options);
      });
    });
  }, []);

  useEffect(()=>{
    console.log("In use effect",editorState.getCurrentContent().getPlainText())
  },[editorState])

  const handleRichContent = (value) => {
      console.log("Im Calling")
        setEditorState(value)
  }
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
          backgroundColor: "#fff",
          overflow: "auto",
          fontFamily: "Raleway,open-sans",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          width: "60%",
          height: "1000px",
          margin: "0 auto",
          padding: "20px",
        },
        overlay: {},
      }}
    >

      <form>

        <div className="form-row">
          <h5 className="modal-title" id="exampleModalLabel" style={{ width: "90%" }}>
            Add New Task
            </h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-square-x icons"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            strokeLinejoin="round"
            style={{ float: "right" }}
            onClick={() => closeModal()}
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
        </div>



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
            <Select
              options={projects.length > 0 ? projects : []}
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select"
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
          <div className="form-group col-md-12">
            <label>Description</label>
            <SimpleStaticToolbarEditor onChange={handleRichContent} />
          </div>
        </div>
      </form>



      <button type="button" className="btn btn-primary">
        Create
    </button>

    </Modal >
  );
}

export default TaskModal;
