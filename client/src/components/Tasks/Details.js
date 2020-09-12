import React, { Fragment } from 'react'
// import socketIOClient from "socket.io-client";
import { connect } from 'react-redux'
import '../../styles/details.css'
import MeetingModal from './meeting';

class Details extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            endpoint: "localhost:5000",
            color: 'white',
            users: undefined,
            tasks: []
            , openMeetingModal: false

        };
        this.openMeetingModal = this.openMeetingModal.bind(this)



    }
    openMeetingModal = () => {
        alert('calling')
        this.setState((prevState) => {
            return { openMeetingModal: !prevState.openMeetingModal }
        })
    }
    static getDerivedStateFromProps(props, state) {
        console.log(props.taskDetails, state.tasks)
        if (props.taskDetails !== state.tasks) {

            return {
                tasks: props.taskDetails
            }
        }
        return null
    }


    render() {
        console.log(this.state.tasks)
        console.log(this.state.tasks.users)



        return (
            <div className='details_wrapper'>
                {this.state.tasks !== undefined ? <Fragment>


                    <div className='details'>
                        <span>Details</span>
                        <span>Attachment</span>
                        <div className='overview'><div class='details-header'>Title</div>
                            <div className='overview_content'>{this.state.tasks.title}</div>
                        </div>
                        <div className='overview'><div class='details-header'>overview</div>
                            <div className='overview_content'>{this.state.tasks.todo_description}</div>
                        </div>
                        <div className='overview'>
                            <button class='action-button' onClick={this.openMeetingModal} isMeetingModalOpened={this.state.isMeetingModalOpened}>Schedule Meeting</button>
                        </div>

                    </div>

                    <div className='genericinfo'>
                        <div className='status header'>
                            <div className='status_header'>Status</div>
                            <span className='status_value completed'>Completed</span>
                            <span className='nested_status incomplete'>In Completed</span>
                        </div>
                        <div className='status header'>
                            <div className='status_header'>Assignee</div>
                            <span className='status_value'>{this.state.tasks.assignee}</span>
                        </div>
                        <div className='status header'>
                            <div className='status_header'>Collaborators</div>
                            {this.state.tasks.users && this.state.tasks.users.map((user) => {
                                console.log(user.name);
                                return <span className='status_value collab'>{user.name}</span>
                            })}
                        </div>
                        <div className='status header'>
                            <div className='status_header'>Projects</div>
                            <span className='status_value'>Fxelle</span>
                        </div>
                        <div className='status header'>
                            <div className='status_header'>Due Date</div>
                            <span className='status_value'>2020-09-20</span>
                        </div>
                        <div className='status header'>
                            <div className='status_header'>Hours to Complete</div>
                            <span className='status_value'>10 hrs</span>
                        </div>
                        <div className='status header'>
                            <div className='status_header'>Label</div>
                            <span className='status_value label'>SQL</span> <span className='status_value label'> Iviva Field issue</span>
                        </div>
                        <div className='status header'>
                            <div className='status_header'>Sprint</div>
                            <span className='status_value'>Naruto</span>
                        </div>
                    </div>
                </Fragment> : "No data"

                }
                {this.state.openMeetingModal ? <MeetingModal isMeetingModalOpened={this.state.openMeetingModal} tasks={this.state.tasks.users} openMeetingModal={this.openMeetingModal} /> : ""}
            </div>


        );

    }
}

const mapStateToProps = state => {
    console.log(state.task)

    return {

        taskDetails: state.task.taskDetails
    }
}
export default connect(mapStateToProps)(Details)
