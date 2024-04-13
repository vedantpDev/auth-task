import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reRender, setReRender] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const searchBarString = window.location.search;
    const urlparam = new URLSearchParams(searchBarString);
    const codeParam = urlparam.get("code");

    if (codeParam && localStorage.getItem("accessToken") === null) {
      const getAccessToken = async () => {
        await axios
          .post("/getAccessToken", { code: codeParam })
          .then(async (data) => {
            if (data.data.access_token) {
              console.log(data.data.access_token);
              localStorage.setItem("accessToken", data.data.access_token);
              navigate("/");
              setReRender(!reRender);
            }
          })
          .catch((err) => console.log(err));
      };
      getAccessToken();
    }
  }, []);

  const loginWithGithub = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`
    );
  };

  const backToDashboard = async () => {
    await axios
      .get("/getUserData", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((data) => {
        setUserData(data.data);
        localStorage.setItem("userData", JSON.stringify(data.data));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const signInUser = async (e) => {
    e.preventDefault();
    try {
      if (email.length > 0 && password.length > 0) {
        const signInUser = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const signInUserData = signInUser.user;
        localStorage.setItem("firebaseUser", JSON.stringify(signInUserData));
        navigate("/");
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
        {localStorage.getItem("accessToken") ? (
          <>
            <button class="btn btn-dark" onClick={backToDashboard}>
              Back to Dashboard
            </button>
          </>
        ) : (
          <div>
            <form style={{ width: "500px" }} onSubmit={signInUser}>
              <h3>Sign In</h3>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
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
              </div>{" "}
              <div className="mb-3">
                <span>
                  <Link style={{ marginLeft: "10px" }} to={"/sign-up"}>
                    Create New Account{" "}
                  </Link>
                </span>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                className=""
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#000",
                  margin: "0 10px",
                }}
              ></div>
              <span className="navbar-text mr-2">or</span>
              <div
                className="or-divider"
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#000",
                  margin: "0 10px",
                }}
              ></div>
            </div>
            <button
              class="btn btn-dark"
              style={{ width: "100%", marginTop: "10px" }}
              onClick={loginWithGithub}
            >
              <img
                src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"
                alt="git hub img"
                height={30}
                width={30}
              />
              Login with GitHub
            </button>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
