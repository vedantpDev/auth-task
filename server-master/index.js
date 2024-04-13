require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const {
  getGithubUserData,
  getAccessToken,
  getUserData,
} = require("./controllers");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post("/getUserGithubData", getGithubUserData);

app.post("/getAccessToken", getAccessToken);

app.get("/getUserData", getUserData);

app.listen(process.env.PORT, () =>
  console.log(`App running on PORT: ${process.env.PORT}`)
);
