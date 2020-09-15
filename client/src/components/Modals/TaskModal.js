import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../styles/taskmodal.css";
import Select from "react-select";
import axios from "axios";
import {connect} from 'react-redux';
import * as actions from "../../store/actions/index";
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import { convertToRaw,convertFromRaw} from 'draft-js'

import SimpleStaticToolbarEditor from "../RichText/Editor";





function TaskModal({ show, closeModal,userid,fnaddnewtask,error}) {
    console.log("user",userid)
  const [editorState,setEditorState] = useState(createEditorStateWithText(''))
  const [projects, setProjects] = useState([]);
  const [users,setUsers] = useState([])
  const [title,setTitle] = useState('')
  const [tags,setTags] = useState('');
  const [userselected,setSelectedUsers] = useState([])
  const [projectselected,setSelectedProjects] = useState([])
  const [terror,setError] = useState(error)
  
  



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
      axios.get('http://localhost:5000/allUsers').then((response)=>{
          const options = [];
          const {users} = response.data;

          users.forEach((value,index)=>{
            const setOptions = {
                value: value._id,
                label: value.name
            }
             options.push(setOptions)
             setUsers(options)
          })
      })
    });
  }, []);

  const submitData = (e)=>{
      e.preventDefault();
        const raw = convertToRaw(editorState.getCurrentContent())
        
        const data = {
              title,
              tags,
              userselected,
              projectselected,
              raw,
              projects,
              assignee: userid
        }
        axios.post('http://localhost:5000/addtask',data).then((response)=>{
             console.log(response.data)
             const x = fnaddnewtask(response.data)
             console.log(x)
             if(!error){
                closeModal()
                //setError(error)
             }
        }).catch((error)=>{
            setError(error.message)
        })
  }

  const handleRichContent = (value) => {
      
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
        overlay: {
            overflow:"scroll"
        },
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
              name="title"
              onChange = { (e)=> setTitle(e.target.value)}
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
              options = {users.length >0  ? users : []}
              isMulti = {true}
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select"
              onChange = {(option)=> setSelectedUsers(option)}
            />
          </div>

          <div className="form-group col-md-6">
            <label className="imp">Projects</label>
            <Select
              options={projects.length > 0 ? projects : []}
              name="colors"
              className="basic-multi-select"
              classNamePrefix="select"
              onChange = {(option)=> setSelectedProjects(option)}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="imp">Tags</label>
            <input
              className="form-control"
              type="text"
              placeholder=""
              id="spent"
              onChange = {(e)=>setTags(e.target.value)}
            />
          </div>
          <div className="form-group col-md-12">
            <label>Description</label>
            <SimpleStaticToolbarEditor onChange={handleRichContent} />
          </div>
        </div>
      </form>



      <button type="button" className="btn btn-primary" onClick={submitData}>
        Create
    </button>

    </Modal >
  );
}
const mapDispacthToProps = dispatch => {
    return {
        fnaddnewtask : (value) => dispatch(actions.addTask(value))
    }
}
const mapStateToProps = state =>{
    console.log(state)
     return {
          userid : state.auth.userid,
          error : state.task.error
     }
}
export default connect(mapStateToProps,mapDispacthToProps)(TaskModal);
