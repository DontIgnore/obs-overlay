import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Obsoverlay.module.css";
import { useRouter } from "next/router";
var SpotifyWebApi = require("spotify-web-api-node");

export default function Home() {
  let currentMusic = "";
  const { asPath } = useRouter();
  let url = asPath;
  var spotifyApi = new SpotifyWebApi({
    accessToken: url.slice(23, 239)
  });
  // console.log(url);

  spotifyApi.getMyCurrentPlaybackState().then(
    function (data) {
      // Output items
      if (data.body && data.body.is_playing) {
        currentMusic = data.body.item.artists[0].name + " " + data.body.item.name;
        console.log(currentMusic);

      } else {
        console.log("User is not playing anything, or doing so in private.");
      }
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );

  // console.log(currentMusic)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.title}>
          Последний подписчик: <span id="lastFollower">---</span>
        </div>
        <div className={styles.title}>
          Последний донат: <span id="lastDonation">---</span>
        </div>
        <div className={styles.title}>
          Сейчас играет: <span id="currentTrack"></span>
        </div>
      </div>
    </div>
  );
}
