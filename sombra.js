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


inquirer.prompt([{
        type: "list",
        message: "Iniciando el hackeo... S0mbr@ online. ¿Qué onda?",
        choices: ["Hack Twitter", "Hack Spotify", "Hack OMDB", "¡Adelante!", "¡Apagando las luces!"],
        name: "hacks"
    }])
    .then(function(beginHack) {
    	hackTwitter()
        // switch (beginHack.hack) {
        //     case "Hack Twitter":
        //         hackTwitter();
        //         break;
        //     case "Hack Spotify":
        //         hackSpotify();
        //         break;
        //     case "Hack OMDB":
        //         hackMovie();
        //         break;
        //     case "¡Adelante!":
        //         adelante();
        //         break;
        //     case "¡Apagando las luces!":
        //         EMP();
        //         break;
        //     default:
        //         EMP();
        //         break;
        // }
    });

function hackTwitter() {
    inquirer.prompt({
        type: "input",
        message: "Así me gusta. Enter a Twitter handle, por favor.",
        name: "twitterHandle"
    }).then(function(response) {
    	console.log(response);
    	console.log(response.twitterHandle)
            var params = { screen_name: response.twitterHandle, tweet_mode: 'extended' };
            twitter.get("statuses/user_timeline", params, function(error, tweets, repsonse) {
                    if (!error) {
                        for (var i = 0; i < tweets.length; i++) {
                            console.log("\n========================================");
                            console.log("\n Tweeted on" + tweets[i].created_at);
                            console.log("\n Tweet: " + tweets[i].full_text);
                            console.log("\n Tweeted By: " + tweets[i].user.name);
                            console.log("\n========================================");
                        }
                    }
                })
        });
}
