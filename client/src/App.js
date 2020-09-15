import React from "react";
import NavBar from "./components/Navbar";
import MyBoard from "./components/MyBoard";

import * as actions from "../src/store/actions/index";
import { connect } from "react-redux";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Projects from "../src/components/Projects";
import CreateUser from "./components/CreateUser";
import HooksDem from "./components/HooksDem";

import Users1 from "./components/Users1";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.autoLogin();
    this.props.loadmyTasks();
  }
  render() {
    
    return (
      <div className="App">
        <NavBar />

        <Switch>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/hooks">
            <HooksDem />
          </Route>
          <Route path="/users">
            <Users1 />
          </Route>
          <Route path="/activity">
            <Projects />
          </Route>
          <Route path="/createuser">
            <CreateUser />
          </Route>
          <Route path="/" exact>
            <MyBoard />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadmyTasks : () => dispatch(actions.loadAllTask()),
    autoLogin: () => dispatch(actions.authCheckhandler()),
    
  };
};
export default connect(null, mapDispatchToProps)(App);
