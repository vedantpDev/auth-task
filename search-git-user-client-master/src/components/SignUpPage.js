import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUpUser = async (e) => {
    e.preventDefault();
    try {
      if (
        name.length > 0 &&
        email.length > 0 &&
        password.length > 0 &&
        confirmPassword.length > 0
      ) {
        if (password === confirmPassword) {
          const signUpUser = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          signUpUser.user.displayName = name;
          const loginUserData = signUpUser.user;
          localStorage.setItem("firebaseUser", JSON.stringify(loginUserData));
        } else {
          alert("password does not match");
        }
      } else {
        alert("Something Missing");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        class="container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div>
          <form style={{ width: "500px" }} onSubmit={signUpUser}>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label>Enter name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                value={email}
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <span>
                Already have an Account?{" "}
                <Link style={{ marginLeft: "10px" }} to={"/sign-in"}>
                  Sign In
                </Link>
              </span>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
