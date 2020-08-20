import React, { useState } from "react";
import "../styles/navbar.css";
import SignUpModal from "./SIgnUpModal";

function NavBar() {
  const [openSignin, setOpenSignin] = useState(false);

  const handleSignUpModal = () => {
    setOpenSignin(!openSignin);
  };
  return (
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <a class="navbar-brand" href="#">
        Navbar w/ text
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
              Home <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Features
            </a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
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
        </ul>
        {openSignin && <SignUpModal show={openSignin} />}
      </div>
    </nav>
  );
}

export default NavBar;
