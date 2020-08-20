import React, { lazy, Suspense } from "react";
import NavBar from "./components/Navbar";
import Mainview from "./components/Mainview";
import Widgets from "./components/Widgets";
//import LoginModal from './components/LoginModal'

import "./App.css";

class App extends React.Component {
  componentDidMount() {}
  render() {
    //  const {history} = this.props;
    // console.log(history)

    //   console.log(this.props.isauthenticated)
    return (
      <div className="App">
        <NavBar />
        <Widgets />
        <Mainview />
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

export default App;
