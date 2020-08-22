import React, { lazy, Suspense } from "react";
import NavBar from "./components/Navbar";
import MyBoard from "./components/MyBoard";
import Widgets from "./components/Widgets";
//import LoginModal from './components/LoginModal'
import * as actions from "../src/store/actions/index";
import { connect } from "react-redux";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.autoLogin();
  }
  render() {
    //  const {history} = this.props;
    // console.log(history)

    //   console.log(this.props.isauthenticated)
    return (
      <div className="App">
        <NavBar />
        <Widgets />
        <MyBoard />
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   // console.log(state)
//   return {
//     isauthenticated: state.auth.isAuthenticated,
//     task: state.task.task
//   }
// }
const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: () => dispatch(actions.authCheckhandler()),
  };
};
export default connect(null, mapDispatchToProps)(App);
