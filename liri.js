require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");


// Take two arguments.
// The first will be the action (i.e. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.
var command = process.argv[2];
// var value = process.argv[3];

// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
// switch (command) {
//     case "spotify-this-song":
//         spotifyThisSong();
//         break

//     case "movie-this":
//         movieThis();
//         break;

//     case "do-what-it-says":
//         doWhatItSays();
//         break;

//     // case "lotto":
//     //   lotto();
//     //   break;
// };
var dict = {
    "spotify-this-song": spotifyThisSong,
    "movie-this": movieThis,
    "do-what-it-says": doWhatItSays,
    "stocks-exchange": stocksExchange
};
dict[command]();


// -------------------

function spotifyThisSong() {

    var songName = process.argv.slice(3).join("+");

    if (typeof songName === "string" && songName.length > 0) {
        spotify.search({ type: 'track', query: songName, limit: 5 })
            .then(function (response) {
                // console.log(response);
                console.log("-------- Track Info -------");

                // console.log(JSON.stringify(response, null, 2));

                console.log(response.tracks.items[0].album.artists[0].name);
                console.log(response.tracks.items[0].name);
                console.log(response.tracks.items[0].preview_url);
                console.log(response.tracks.items[0].album.name);
                console.log("-------- Track Complete -------");
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    else {
        //ANNOYING AS FUCK
        console.log("The Sign");
        console.log("Ace of Base");
    }
};
function movieThis() {

    var movieName = process.argv.slice(3).join('+');

    if (movieName !== "") {
        // Then run a request with axios to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        // This line is just to help us debug against the actual URL.
        // console.log(queryUrl);
        // Then create a request with axios to the queryUrl
        axios.get(queryUrl)
            .then(
                function (response) {
                    // console.log(response);
                    console.log("--------MOVIE INFO-----------");
                    console.log("Title: " + response.data.Title);
                    console.log("Year: " + response.data.Year);
                    console.log("IMDB Rating: " + response.data.imdbRating);
                    console.log("MetaScore: " + response.data.Metascore);
                    console.log("Country: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);
                    console.log("--------Completed-----------");
                }
            ).catch(
                function (error) {
                    console.log(error);
                }
            );
    }
    else {
        console.log('If you haven' + 't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/');
        console.log("It's on Netflix!");
    }


};
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        // console.log(dict[dataArr[0]]());
        console.log(dict[dataArr[0]]);

    });
};
function stocksExchange() {
    var stockName = process.argv[3];



    var queryUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="
        + stockName + "&interval=5min&apikey=FR5J687E5KLURB1P";

    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);
    // Then create a request with axios to the queryUrl
    axios.get(queryUrl)
        .then(
            function (response) {
                // console.log(response);


                
                //WONT STRINGIFY: 
                // console.log(JSON.stringify(response, null, 2));
                console.log(response.data);


            }
        ).catch(
            function (error) {
                console.log(error);
            }
        );
}