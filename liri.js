require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");


// -------------------

var command = process.argv[2];

if (command === "spotify-this-song") {

    var songName = process.argv.slice(3).join("+");

    if (songName !== "") {
        spotify.search({ type: 'track', query: songName, limit: 5 })
            .then(function (response) {
                // console.log(response);
                console.log("-------- Track Info -------");
                // console.log("-------------NAME ^^^--------");
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
}
else if (command === "movie-this") {

    var movieName = process.argv.slice(3).join('+');

    if (movieName !== "") {
        // console.log(arg);
        console.log(movieName);
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
        var noMovie = "Mr. Nobody";
        noMovie.split(' ').join('+');
        var queryUrl = "http://www.omdbapi.com/?t=" + noMovie + "&y=&plot=short&apikey=trilogy";

        // This line is just to help us debug against the actual URL.
        // console.log(queryUrl);
        // Then create a request with axios to the queryUrl
        axios.get(queryUrl)
            .then(
                function (response) {
                    console.log('If you haven'+'t watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/');
                    console.log("It's on Netflix!");
                }
            ).catch(
                function (error) {
                    console.log(error);
                }
            );
    }

}
else if (command === "do-what-it-says") {

}
else if (command === "#") {

}
else {

};