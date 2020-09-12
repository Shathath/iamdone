import React from 'react'
import moment from 'moment'
import { useHistory } from 'react-router'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadtaskdetails } from '../../aactions/taskaction'
import { bindActionCreators } from 'redux';
import '../../styles/task.css';



function Task(props) {

    //const history = useHistory();

    const navigateToDetails = (e) => {
        const se = (e.target.getAttribute('id'))

        props.loadtaskdetails(e.target.getAttribute('id'))
        props.history.push('/details');
    }



    var { priority, title, status = 'InProgress', duedate, _id } = props.data
    console.log(_id)
    duedate && (duedate = moment(duedate).format('MM/DD/YYYY'))


    // const view = `/viewtask/${_id}`
    if (status === 'In Progress') var cardClassName = `task_card inprogress`
    if (status === 'New') cardClassName = 'task_card new'
    if (status === 'Resolved') cardClassName = 'task_card resolved'
    if (status === 'Closed') cardClassName = 'task_card closed'
    if (priority === 'High') var circleClassName = 'task_circle high'
    if (priority === 'Low') circleClassName = 'task_circle low'
    if (priority === 'Medium') circleClassName = 'task_circle medium'

    function arraytobase64(buffer, type) {
        var binary = '';

        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        var arrayto64 = window.btoa(binary);
        console.log(arrayto64, type)
        var base64 = `data:${type};base64,${arrayto64}`
        console.log("Base64", base64)
        return base64
    }
    console.log(props)
    console.log(props.users)
    return (

        <div className={cardClassName} id={_id} onClick={navigateToDetails} >
            <div className='task_name'>
                {title}
                <span>{duedate}</span>
            </div>

            <div className='task_priority'>

                <div className={circleClassName}></div>
                <div className={circleClassName} style={{ 'animationDelay': '1s' }}></div>
                <div className={circleClassName} style={{ 'animationDelay': '1.5s' }}></div>
                <div className={circleClassName} style={{ 'animationDelay': '3s' }}></div>
                <div className='task_priority_name'>{priority}</div>
            </div>
            {props.users ? props.users.map((user) => {

                return <span style={{ backgroundImage: `url(${arraytobase64(user.avatar ? user.avatar.data : undefined, user.avatartype)}` }} />
            })
                : <p> Bulb </p>}





        </div >


    )
}
const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({ loadtaskdetails }, dispatch)
}

export default withRouter(connect(null, mapDispatchToProps)(Task))