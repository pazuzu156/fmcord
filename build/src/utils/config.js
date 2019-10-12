"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var Config = /** @class */ (function () {
    function Config() {
        var cp = path.resolve(__dirname, '../../../config.json');
        fs.exists(cp, function (exists) {
            if (!exists) {
                console.log("No config.json file found! The example config file will be used.");
                fs.copyFile(path.resolve(__dirname, '../../../config.example.json'), cp, function (err) {
                    if (err)
                        throw err;
                    console.log('Config file created. Please add in any required information for the bot\'s config ');
                });
            }
        });
        try {
            var c = require(cp);
            this.Prefix = c.prefix;
            this.DiscordToken = c.discordToken;
            this.LastFM = c.lastFM;
            this.YouTube = c.youtube;
            this.Spotify = c.spotify;
            this.BotOwnerID = c.botOwnerID;
        }
        catch (ex) {
            console.error('An exception was thrown loading configuration!');
            console.error(ex);
        }
    }
    return Config;
}());
exports.Config = Config;
