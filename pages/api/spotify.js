var SpotifyWebApi = require("spotify-web-api-node");

var scopes = [
    "user-read-private",
    "user-read-playback-state",
    "user-read-email",
  ],
  redirectUri = "http://localhost:3000/callback",
  clientId = "5d894d34422e4b1090e00570166853c7",
  state = "some-state-of-my-choice",
  showDialog = true,
  responseType = "token";

var spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId,
});

var authorizeURL = spotifyApi.createAuthorizeURL(
  scopes,
  state,
  showDialog,
  responseType
);

export default function handler(req, res) {
  res.status(200).redirect(authorizeURL);
}
