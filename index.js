const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  login,
  authenticate,
  getAccessToken,
  logout,
} = require("./controllers/oauth");
const { getAllPlaylists, getUser } = require("./controllers/playlist");
const {
  transferPlayback,
  resumePlayback,
  pausePlayback,
  nextPlayback,
  previousPlayback,
  seekPlayback,
  volumePlayback,
} = require("./controllers/player");

const port = 5000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to Spotify App.");
});

app.get("/auth/login", login);

app.get("/auth/logout", logout);

app.get("/auth/callback", authenticate);

app.get("/auth/token", getAccessToken);

app.get("/user", getUser);

app.get("/playlists", getAllPlaylists);

app.post("/player/:deviceId", transferPlayback);

app.post("/player/play/:deviceId", resumePlayback);

app.post("/player/pause/:deviceId", pausePlayback);

app.post("/player/next/:deviceId", nextPlayback);

app.post("/player/previous/:deviceId", previousPlayback);

app.post("/player/seek/:deviceId", seekPlayback);

app.post("/player/volume/:deviceId", volumePlayback);

app.listen(port, () => {
  console.log(
    `Spotify App is listening on port ${port}. Press Ctrl-C to stop...`
  );
});
