import React from 'react';
import {connect} from 'react-redux';
import '../../styles/task.css'
import { Skeleton,Avatar } from 'antd';
import 'antd/dist/antd.css';
import '../../styles/customantd.css'


function Tasks (props){
   // console.log(props.task.tasks)
   console.log(props.task)
   const tasks = props.task;
   const isLoading = props.loading
   console.log("Loading",isLoading)
   function arraytobase64(buffer) {
            
    var binary = '';

    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    var arrayto64 = window.btoa(binary);
    

    var base64 = `data:image/jpeg;base64,${arrayto64}`
    //console.log("Base64", base64)
    return base64    
}

       return (<div className='container-fluid' style={{display:'flow-root',marginLeft: '20px'}}>
               <div className='row'>
                
          { tasks ? tasks.map((value)=>{
              //console.log(Loading)
            return (
                    <div className='col-sm-6 col-md-6 col-lg-3'>
                     
                      <div className='taskcard'>
                        {props.loading ?  <Skeleton active title = {{rows:1}} paragraph={{ rows: 4 }} avatar /> : 
                        <React.Fragment>
                            <div className={`taskstatus ${value.status == 'In Progress' ? 'In-Progress': value.status}`}>{value.status}</div>
                            <div className='taskassignedby'></div>
                            <div className='taskheader'>{value.taskname}</div>
                            <div className='taskprogress'></div>
                            <div className='taskusers'>
                                <Avatar.Group maxCount={2}  maxStyle={{backgroundColor: 'dodgerblue'}}>
                                {value.usersdoing && value.usersdoing.map((item)=>{
                                    console.log(item.avatar,item.name)
                                    return <Avatar src={item.avatar !==undefined ? arraytobase64(item.avatar.data): ""}/>
                                })}
                                </Avatar.Group>
                            </div>
                        </React.Fragment>
                        }
                        
                      </div>
                      
                    </div>
                )          
        }): null }
        </div>
        </div>)
    }

const mapStateToProps = state =>{
    console.log("state",state)
    console.log("loading map State to props",state.task.loading)
     return {
         task: state.task.tasks,
         loading: state.task.loading
     }
}

export default connect(mapStateToProps)(Tasks)
