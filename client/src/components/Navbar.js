import React, { useState } from "react";
import { connect } from "react-redux";
import "../styles/navbar.css";
import SignUpModal from "./SIgnUpModal";

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
          <li class="nav-item active">
            <a class="nav-link" href="#">
              My Board<span class="sr-only"></span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              My Projects
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Actvity
            </a>
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
            <li class="nav-item active">
              <a class="nav-link" href="#">
                {user}
                <span class="sr-only"></span>
              </a>
            </li>
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
