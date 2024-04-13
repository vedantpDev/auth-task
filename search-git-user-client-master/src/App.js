import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "./components";

function App() {
  const [searchedValue, setSearchedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [githubUserData, setGithubUserData] = useState({
    avatar_url: "",
    bio: "",
    name: "",
    sortedReposByWatchers: [],
  });

  const searchGitUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/getUserGithubData", {
        userName: searchedValue,
      });
      const userGithubData = response;
      console.log(userGithubData);
      if (userGithubData.status === 200) {
        setGithubUserData({
          avatar_url: userGithubData.data.avatar_url,
          bio: userGithubData.data.bio,
          name: userGithubData.data.name,
          sortedReposByWatchers: userGithubData.data.sortedReposByWatchers,
        });
      } else {
        setGithubUserData({
          avatar_url: "",
          bio: "",
          name: "",
          sortedReposByWatchers: [],
        });
      }
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      {/* Search Bar */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <input
                type="text"
                id="searchUser"
                className="form-control"
                value={searchedValue}
                placeholder="Search Github User"
                onChange={(e) => setSearchedValue(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "10px" }}
                  type="button"
                  onClick={searchGitUser}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card */}
        {loading ? (
          <div>
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {githubUserData.name.length > 0 ? (
              <div class="card">
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div
                    className=""
                    style={{
                      marginLeft: "20px",
                      marginRight: "20px",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <img
                      src={githubUserData.avatar_url}
                      style={{ width: "200px", height: "200px" }}
                      className="img-thumbnail rounded rounded-circle"
                      alt={githubUserData.avatar_url}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "50px", fontWeight: "500" }}>
                        {githubUserData.name}
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "500",
                        }}
                      >
                        {githubUserData.bio}
                      </div>
                    </div>
                  </div>
                </div>
                <table class="table ">
                  <thead>
                    <tr>
                      <th scope="col">Sr.No</th>
                      <th scope="col">Project Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Watchers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {githubUserData?.sortedReposByWatchers?.map((data, i) => (
                      <tr
                        style={{ cursor: "pointer" }}
                        key={i}
                        onClick={() => {
                          console.log(data.html_url);
                          window.open(data.html_url, "_blank");
                        }}
                      >
                        <th scope="row">{i + 1}</th>
                        <td>{data.projectName}</td>
                        <td>
                          {data?.description?.length > 0
                            ? data.description
                            : "Empty"}
                        </td>
                        <td>{data.watchers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
