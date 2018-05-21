require("dotenv").config();

//set variables for all required node packages
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var inquirer = require("inquirer");

var skull = `  
                  ,jB@@B@B@B@BBL.
               @B@B@BMMMMMB@B@B@Nr
           :kB@B@@@MMOMOMOMOMMMM@B@B@B1,
       :5@B@B@B@BBMMOMOMOMOMOMOMM@@@B@B@BBu.
    70@@@B@B@B@BXBBOMOMOMOMOMOMMBMPB@B@B@B@B@Nr
  G@@@BJ iB@B@@  OBMOMOMOMOMOMOM@2  B@B@B. EB@B@S
  @@BM@GJBU.  iSuB@OMOMOMOMOMOMM@OU1:  .kBLM@M@B@
  B@MMB@B       7@BBMMOMOMOMOMOBB@:       B@BMM@B
  @@@B@B         7@@@MMOMOMOMM@B@:         @@B@B@
  @@OLB.          BNB@MMOMOMM@BEB          rBjM@B
  @@  @           M  OBOMOMM@q  M          .@  @@
  @@OvB           B:u@MMOMOMMBJiB          .BvM@B
  @B@B@J         0@B@MMOMOMOMB@B@u         q@@@B@
  B@MBB@v       G@@BMMMMMMMMMMMBB@5       F@BMM@B
  @BBM@BPNi   LMEB@OMMMM@B@MMOMM@BZM7   rEqB@MBB@
  B@@@BM  B@B@B  qBMOMB@B@B@BMOMBL  B@B@B  @B@B@M
   J@@@@PB@B@B@B7G@OMBB.   ,@MMM@qLB@B@@@BqB@BBv
      iGB@,i0@M@B@MMO@E  :  M@OMM@@@B@Pii@@N:
         .   B@M@B@MMM@B@B@B@MMM@@@M@B
             @B@B.i@MBB@B@B@@BM@::B@B@
             B@@@ .B@B.:@B@ :B@B  @B@O
               :0 r@B@  B@@ .@B@: P:
                   vMB :@B@ :BO7
                       ,B@B`;

askHack();

//prompt the user with available commands
function askHack() {
    inquirer.prompt([{
            type: "list",
            message: "Iniciando el hackeo... S0mbr@ online. ¿Qué onda?",
            choices: ["Hack Twitter", "Hack Spotify", "Hack OMDB", "¡Adelante!", "¡Apagando las luces!"],
            name: "hacks"
        }])
    //intialize a function based on their selection
        .then(function(beginHack) {
            switch (beginHack.hacks) {
                case "Hack Twitter":
                    hackTwitter();
                    break;
                case "Hack Spotify":
                    hackSpotify();
                    break;
                case "Hack OMDB":
                    hackMovie();
                    break;
                case "¡Adelante!":
                    adelante();
                    break;
                case "¡Apagando las luces!":
                    EMP();
                    break;
                default:
                    EMP();
                    break;
            }
        });
}

//repeat the prompt after the function ends
function repeat(prompt) {
    inquirer.prompt([{
        type: "input",
        message: "\n¡Ja! ¡Me la rifé! press any key to continue",
        name: "userInput",
    }]).then(prompt);
}

//grab 20 tweets based on twitter handle that user inputs
function hackTwitter() {
    inquirer.prompt({
        type: "input",
        message: "Así me gusta. Enter a Twitter handle, por favor.",
        name: "twitterHandle"
    }).then(function(response) {
        var screenName = response.twitterHandle;
        //if user doesn't enter anything, grab tweets from Overwatch's twitter
        if (!screenName) { screenName = "PlayOverwatch"; }

        var params = { screen_name: screenName, tweet_mode: 'extended' };
        twitter.get("statuses/user_timeline", params, function(error, tweets, repsonse) {
            if (!error) {
            	//display the tweets in the terminal
                for (var i = 0; i < tweets.length; i++) {
                    console.log("\n========================================");
                    console.log("\n Tweeted on " + tweets[i].created_at);
                    console.log("\n Tweet: " + tweets[i].full_text);
                    console.log("\n Tweeted By: " + tweets[i].user.name);
                    console.log("\n========================================");
                }
                repeat(askHack);
            }
        })
    });
}

//displays info about a song based on what user inputs
function hackSpotify() {
    inquirer.prompt({
        type: "input",
        message: "De pelos! ¡Asústame, Panteón! What song are we jamming to, amigo?",
        name: "song"
    }).then(function(response) {
        var songName = response.song;
        //if user enters no song name, play "Rally the Heroes" from the Overwatch soundtrack
        if (!songName) { songName = "Rally the Heroes"; }

        spotify.search({
            type: "track",
            query: songName
        }, function(error, data) {

            var songInfo = data.tracks.items[0];

            if (!error) {
            	//display if user enters a song that cannot be found, or too vague
                if (!songInfo) {
                    console.log("Lo siento, I couldn't find that song. Intentamos otra vez.");
                } else {
                    console.log(songInfo.name);
                    console.log(songInfo.album.name);
                    for (var i = 0; i < songInfo.artists.length; i++) {
                        console.log("\nArtist(s) - " + songInfo.artists[i].name);
                    }
                    console.log("Listen here - " + songInfo.preview_url);
                    console.log("\n");
                }
                repeat(askHack);
            }
        })

    });
}

//displays info about a movie based on what user inputs
function hackMovie() {
    inquirer.prompt({
        type: "input",
        message: "¿Es en serio? I'm more of a telenovela chica, but lo que sea, what movie you want?",
        name: "movieTitle"
    }).then(function(input) {
        var movie = input.movieTitle;

        if (!movie) { movie = "Hackers"; }

        var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        request(queryURL, function(error, response, body) {
            var movieInfo = JSON.parse(response.body);
            if (!error && response.statusCode === 200) {
                console.log("\nTorrenting " + movie + " to c://user/desktop")
                console.log("\nReleased - " + movieInfo.Year);
                console.log("IMBD Rating - " + movieInfo.imdbRating);
                console.log("RT Score - " + movieInfo.Ratings[1].Value);
                console.log("Country - " + movieInfo.Country);
                console.log("Language - " + movieInfo.Language);
                console.log("Actors - " + movieInfo.Actors);
                console.log("Plot Summary - " + movieInfo.Plot);

                repeat(askHack);
            }
        })


    });
}

//plays the song listed in the random.txt
function adelante() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        var song = data.split(", ");
        if (!error) {

            spotify.search({
                type: "track",
                query: song[1]
            }, function(error, data) {

                var songInfo = data.tracks.items[0];

                if (!error) {
                    console.log("¡Qué pex!, D.VA was showing me some kpop, I really like this one. It's muy feugo")
                    console.log(songInfo.name);
                    console.log("By - " + songInfo.artists[0].name);
                    console.log("Listen here - " + songInfo.preview_url);
                    repeat(askHack);
                }
            })

        }
    })
}

//exits the app, displays cool ASCII art B)
function EMP() {
    console.log("EMP ACTIAVTED, Ahí nos vidrios.");
    console.log(skull);
}