const axios = require("axios");

const getGithubUserData = async (req, res) => {
  try {
    const { userName } = req.body;
    const response = await axios.get(
      `https://api.github.com/users/${userName}`
    );
    const userData = response.data;
    const statusCode = response.status;
    const bio = userData.bio;
    const avatar_url = userData.avatar_url;
    const loginName = userData.loginName;
    const name = userData.name;
    const repos_url = userData.repos_url;

    if (statusCode === 200) {
      if (repos_url.length > 0) {
        const reposResponse = await axios.get(repos_url);
        const reposData = reposResponse;
        const reposDataStatus = reposData.status;
        const userRepoData = reposData.data;
        if (reposDataStatus === 200 && userRepoData.length > 0) {
          const sortedReposByWatchers = userRepoData
            .map((data) => ({
              projectName: data.name,
              watchers: data.watchers,
              description: data.description,
              html_url: data.html_url,
            }))
            .sort((a, b) => b.watchers - a.watchers);
          res
            .status(200)
            .send({ sortedReposByWatchers, bio, avatar_url, loginName, name });
        } else if (reposDataStatus !== 200) {
          res.status(reposDataStatus).send({ message: "Something went wrong" });
        }
      }
    } else {
      res.status(400).send({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(error.response.status).send({ message: error.message });
  }
};

const getAccessToken = async (req, res) => {
  const { code } = req.body;
  try {
    await fetch(
      "https://github.com/login/oauth/access_token" +
        "?client_id=" +
        process.env.CLIENT_ID +
        "&client_secret=" +
        process.env.CLIENT_SECRET +
        "&code=" +
        code,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        res.status(200).send(responseData);
      });
  } catch (error) {
    res.status(error.response.status).send({ message: error.message });
  }
};

const getUserData = async (req, res) => {
  try {
    const token = req.get("Authorization");
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: token,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response.status).send({ message: error.message });
  }
};

module.exports = { getGithubUserData, getAccessToken, getUserData };
