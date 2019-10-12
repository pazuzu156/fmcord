"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var cfg = new config_1.Config();
exports.default = {
    test: "this is a test snippet. here's the bot token: " + cfg.DiscordToken
};
