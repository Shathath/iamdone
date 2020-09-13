import React, { useState, useCallback } from "react";
import Modal from "react-modal";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "../../styles/signup.css";

function SignUpModal({
  show = false,
  closeModal,
  authOperation,
  isloading,
  isAuthenticated = false,
}) {
  const [isSignup, showisSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [error, setError] = useState("");

  const handleisSignup = () => {
    showisSignup(!isSignup);
  };
  const handleEmailValue = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email]
  );

  const handlePasswordValue = useCallback(
    (e) => {
      console.log(password);
      if (e.target.name === "password") setPassword(e.target.value);
      if (e.target.name === "confirmpassword")
        setconfirmpassword(e.target.value);
    },
    [password, confirmpassword]
  );

  const handleauthenticate = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setError("Enter Email or Password");
    }
    if (isSignup && password !== confirmpassword) {
      return setError("Password are not same");
    }

    authOperation(email, password, isSignup);
  };

  return (
    <Modal
      isOpen={show && isAuthenticated ? false : true}
      style={{
        content: {
          position: "absolute",
          top: "100px",
          left: "40px",
          right: "40px",
          bottom: "40px",
          border: "1px solid #f2f2f2",
          boxShadow: "2px 2px 10px #f2f2f2",
          borderRadius: "4px",
          outline: "none",
          width: "30%",
          height: isSignup || error ? "550px" : "400px",
          fontFamily: "Raleway , sans-serif",
          margin: "0 auto",
          padding: "20px",
        },
      }}
    >
      <div className="container">
        <form>
          <div className="form-group">
            <h3 style={{ textAlign: "center", display: "inline" }}>LOGIN</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-square-x icons"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="#000000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              style={{ float: "right" }}
              onClick={() => closeModal()}
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M10 10l4 4m0 -4l-4 4" />
            </svg>
          </div>
          {error ? <p className="error-msg">{error}</p> : null}
          <div className="form-group">
            <label className="labels" style={{ fontWeight: "bold" }}>
              UserName or Email
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Username or Email"
              onChange={handleEmailValue}
            />
          </div>
          <div className="form-group">
            <label className="labels" style={{ fontWeight: "bold" }}>
              Password
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              onChange={handlePasswordValue}
              name="password"
            />
          </div>
          {isSignup ? (
            <div className="form-group">
              <label className="labels" style={{ fontWeight: "bold" }}>
                Confirm Password
              </label>
              <input
                className="form-control"
                type="
                password"
                placeholder="Password"
                name="confirmpassword"
                onChange={handlePasswordValue}
              />
            </div>
          ) : null}
          {isSignup ? (
            <button
              className="btn btn-primary btn-login"
              type=""
              onClick={handleauthenticate}
            >
              {isloading && (
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Sign Up
            </button>
          ) : (
            <button
              className="btn btn-primary btn-login"
              type=""
              onClick={handleauthenticate}
            >
              {isloading && (
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Login
            </button>
          )}
          <div className="form-group adduplinks">
            <span className="fpassword">Forgot Password ?</span>
            {isSignup ? (
              <span className="slinks" onClick={handleisSignup}>
                Login
              </span>
            ) : (
              <span className="slinks" onClick={handleisSignup}>
                Sign Up
              </span>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
const mapDispatchToprops = (dispatch) => {
  return {
    authOperation: (email, password, isSignup) =>
      dispatch(actions.authUser(email, password, isSignup)),
  };
};
const mapStateToProps = (state) => {
  return {
    isloading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(SignUpModal);
