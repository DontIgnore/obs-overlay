var request = require("request");
var querystring = require("querystring")
// var client_id = "5d894d34422e4b1090e00570166853c7"; // Your client id
// var client_secret = "5b047ad8c97b4eca860fc3a8b400b8b1"; // Your secret

// // your application requests authorization
// var authOptions = {
//   url: "https://accounts.spotify.com/api/token",
//   headers: {
//     Authorization:
//       "Basic " + new Buffer(client_id + ":" + client_secret).toString("base64"),
//   },
//   form: {
//     grant_type: "client_credentials",
//   },
//   json: true,
// };

export default function handler(req, res) {
  var client_id = "5d894d34422e4b1090e00570166853c7";
  var client_secret = "5b047ad8c97b4eca860fc3a8b400b8b1";

  // var authOptions = {
  //   url: "https://accounts.spotify.com/api/token",
  //   headers: {
  //     Authorization:
  //       "Basic " +
  //       new Buffer(client_id + ":" + client_secret).toString("base64"),
  //   },
  //   form: {
  //     grant_type: "client_credentials",
  //   },
  //   json: true,
  // };

  // request.post(authOptions, function (error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     var token = body.access_token;
  //     var getMusicOptions = {
  //       url: "https://api.spotify.com/v1/me/player/currently-playing",
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //       form: {
  //         grant_type: "client_credentials",
  //       },
  //       json: true,
  //     };
  //     getMusic(getMusicOptions);

  //     res.status(200).json(token);
  //   }
  // });
  function generateRandomString(n) {
    let randomString           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for ( let i = 0; i < n; i++ ) {
      randomString += characters.charAt(Math.floor(Math.random()*characters.length));
   }
   return randomString;
}

  var redirect_uri = "http://localhost:3000/api/callback";


  request.get("http://localhost:3000/api/login", function (req, res) {
    var state = generateRandomString(16);
    var scope = "user-read-private user-read-email";
    console.log(res)
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        })
    );
  });
}
