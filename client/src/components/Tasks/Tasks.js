import React from 'react';
import {connect} from 'react-redux';

function Tasks (props){
    console.log(props.task.tasks)
   return (
        <div className=''>

        </div>
   )
}

const mapStateToProps = state =>{

     return {
         task: state.task.tasks
     }
}

export default connect(mapStateToProps)(Tasks)
