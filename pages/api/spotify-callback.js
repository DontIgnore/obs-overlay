import db from '../../db/index'
import axios from "axios";

const redirectUri = "http://localhost:3000/api/spotify-callback"
const clientId = 'client'
const clientSecret = 'secret'

export default async function handler(req, res) {
  const {query} = req
  try {
    const { data } = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      code: query.code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    }), {
      headers: {
        'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
    })
    await db.push('/spotify-access-token', data.access_token)
    await db.push('/spotify-refresh-token', data.refresh_token)
    await db.push('/spotify-token-type', data.token_type)
    await db.push('/spotify-expires-in', data.expires_in)
    await db.push('/spotify-scope', data.refresh_token)
  } catch (e) {
    return res.redirect('/')
  }
  return res.redirect('/')
}
