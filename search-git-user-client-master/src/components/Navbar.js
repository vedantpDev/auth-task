import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isFirebaseUserLoggedIn, setIsFirebaseUserLoggedIn] = useState(false);
  const [loggedInUserData, setLoggedInUserData] = useState({});
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const getUserData = async () => {
        await axios
          .get("/getUserData", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          })
          .then((data) => {
            setLoggedInUserData(data.data);
            localStorage.setItem("userData", JSON.stringify(data.data));
          })
          .catch((err) => console.log(err));
      };
      getUserData();
      setIsUserLoggedIn(true);
      setIsFirebaseUserLoggedIn(false);
      //   setLoggedInUserData(JSON.parse(localStorage.getItem("userData")));
    } else if (JSON.parse(localStorage.getItem("firebaseUser"))) {
      setIsUserLoggedIn(false);
      setIsFirebaseUserLoggedIn(true);
      setLoggedInUserData(JSON.parse(localStorage.getItem("firebaseUser")));
    } else {
      setIsUserLoggedIn(false);
      setIsFirebaseUserLoggedIn(false);
      setLoggedInUserData({});
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <nav class="navbar navbar-light bg-light" style={{ width: "80%" }}>
        <div
          class="container-fluid"
          style={{
            backgroundColor: "black",
            color: "white",
            height: "80px",
            borderRadius: "23px",
            textAlign: "center",
          }}
        >
          {isUserLoggedIn && !isFirebaseUserLoggedIn ? (
            <div style={{ width: "70px", height: "70px" }}>
              <Link class="navbar-brand" href="/">
                <img
                  style={{
                    borderRadius: "100%",
                    width: "100%",
                    height: "100%",
                  }}
                  src={loggedInUserData?.avatar_url}
                  alt=""
                  width="30"
                  height="24"
                  class="d-inline-block align-text-top"
                />
              </Link>
            </div>
          ) : (
            <div></div>
          )}

          <div>
            {isUserLoggedIn && !isFirebaseUserLoggedIn ? (
              <div>{loggedInUserData?.name}</div>
            ) : !isUserLoggedIn && isFirebaseUserLoggedIn ? (
              <div>{loggedInUserData?.email}</div>
            ) : (
              <div>You Are Not Logged In</div>
            )}
          </div>
          <div>
            {isUserLoggedIn || isFirebaseUserLoggedIn ? (
              <>
                <button
                  type="button"
                  class="btn btn-danger mx-2"
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("userData");
                    localStorage.removeItem("firebaseUser");
                    setReRender(!reRender);
                    navigate("/sign-in");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  class="btn btn-success mx-2"
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  class="btn btn-success mx-2"
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
