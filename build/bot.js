"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas = require("canvas");
var express = require("express");
var path = require("path");
var client_1 = require("./src/client");
var fs = require("fs");
var app = express();
if (process.platform === 'win32') {
    // win32
    canvas.registerFont(path.resolve(__dirname, '../fonts/Inconsolata.otf'), {
        family: 'inconsolata'
    });
}
else {
    // *nix
    canvas.registerFont(path.resolve(__dirname, '../fonts/NotoSansCJK-Regular.ttc'), {
        family: 'noto-sans'
    });
}
var client = new client_1.Client({
    disableEveryone: true
});
process.on('unhandledRejection', console.error);
fs.readdir(path.resolve(__dirname, './src/events/'), function (err, files) {
    if (err)
        throw err;
    files.forEach(function (file) {
        var eventName = file.split('.')[0];
        var func = require("./src/events/" + file);
        client.on(eventName, func.bind(null, client, client.Discord));
        console.log("Event " + eventName + " loaded");
    });
});
client.Discord.login(client.config.DiscordToken).then(function () { return console.log("I'm in!'"); });
