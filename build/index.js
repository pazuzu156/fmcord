"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var discord_js_1 = require("discord.js");
var config_1 = require("./src/utils/config");
var config = new config_1.Config();
var manager = new discord_js_1.ShardingManager(path.resolve(__dirname, 'bot.js'), { token: config.DiscordToken });
manager.spawn().catch(console.error);
manager.on('launch', function (shard) { return console.log("Launched shard " + shard.id + "."); });
manager.on('message', function (shard, message) {
    console.log("Shard[" + shard.id + "] : ", message._eval, ':', message._result);
    if (message._error) {
        console.error(message._error);
    }
});
