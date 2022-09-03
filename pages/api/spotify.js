import querystring from 'querystring'

const scopes = [
    "user-read-private",
    "user-read-playback-state",
    "user-read-email",
  ]
const redirectUri = "http://localhost:3000/api/spotify-callback"
const clientId = "5d894d34422e4b1090e00570166853c7"
const state = "some-state-of-my-choice";

export default function handler(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scopes.join(' '),
      redirect_uri: redirectUri,
      state: state
    }));
}
