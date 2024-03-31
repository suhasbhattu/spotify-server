const dotenv = require("dotenv");

dotenv.config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let index = 0; index < length; index++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const login = (req, res) => {
  const scope =
    "streaming user-read-email user-read-private playlist-read-private";
  const state = generateRandomString(16);
  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: "https://spotify-server-nine.vercel.app/auth/callback",
    state: state,
  });
  res.redirect(
    `https://accounts.spotify.com/authorize/?${auth_query_parameters.toString()}`
  );
};

const authenticate = async (req, res) => {
  const code = req.query.code;
  const body = new URLSearchParams({
    code: code,
    redirect_uri: "https://spotify-server-nine.vercel.app/auth/callback",
    grant_type: "authorization_code",
  });
  const authCode = Buffer.from(
    `${spotify_client_id}:${spotify_client_secret}`
  ).toString("base64");
  const headers = {
    Authorization: `Basic ${authCode}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: headers,
      body: body,
    });
    const data = await response.json();
    process.env["access_token"] = data.access_token;
    res.redirect("http://localhost:3000/home");
  } catch (error) {
    console.log(error);
  }
};

const getAccessToken = (req, res) => {
  res.json({
    access_token: process.env.access_token ?? "",
  });
};

const logout = (req, res) => {
  process.env["access_token"] = "";
  res.redirect("http://localhost:3000");
};

module.exports = { login, authenticate, getAccessToken, logout };
