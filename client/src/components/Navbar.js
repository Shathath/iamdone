import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import "../styles/main.css";
import SignUpModal from "./Modals/SignUpModal";

function NavBar({ user, isAuthenticated = false }) {
  const [openSignin, setOpenSignin] = useState(false);

  const handleSignUpModal = () => {
    alert("calling");
    setOpenSignin(!openSignin);
  };
  return (
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <a class="navbar-brand" href="#">
        i'm DONE
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <NavLink exact to="/" className="custom-nav-link">
              Board
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="custom-nav-link" to="/projects">
              My Projects
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="custom-nav-link" to="/activity">
              Activity
            </NavLink>
          </li>
          
        </ul>

        <ul class="navbar-nav ml-auto">
          {!isAuthenticated ? (
            <>
              <button
                type="button"
                class="btn btn-outline-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                onClick={handleSignUpModal}
              >
                LOGIN
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                SIGN UP
              </button>
            </>
          ) : (
              <React.Fragment>
            <li className="nav-item">
                <div className="dropdown show">
                    <a className="btn btn-secondary dropdown-toggle" style={{"backgroundColor":"#4c7fed",border:"none",outline:"none"}} href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Settings
                    </a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <NavLink className="dropdown-item" to="/createuser">Create New User</NavLink>
                        <a className="dropdown-item" href="#">Change Auth Roles</a>
                        <a className="dropdown-item" href="#">Logout</a>
                    </div>
                </div>
            
            </li>
            <li class="nav-item">
              <a class="nav-link user-name" href="#">
                {user}
                <span class="sr-only"></span>
              </a>
            </li>
           
          </React.Fragment>
          )}
        </ul>
        {openSignin && (
          <SignUpModal show={openSignin} closeModal={handleSignUpModal} />
        )}
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(NavBar);
