import db from "../../db/index";
import SpotifyWebApi from "spotify-web-api-node";

export default async function handle(req, res) {
  try {
    const accessToken = await db.getData('/spotify-access-token')

    const spotifyApi = new SpotifyWebApi({
      accessToken,
    });

    try {
      const data = await spotifyApi.getMyCurrentPlaybackState()
      let currentMusic = undefined
      // Output items
      if (data.body && data.body.is_playing) {
        currentMusic = data.body.item.artists[0].name + " " + data.body.item.name;
      }

      return res.json({
        current: currentMusic
      })
    } catch(e) {
      // error occurred
      return res.status(401)
    }
  } catch {
    // token not found
    return res.status(401)
  }
}
