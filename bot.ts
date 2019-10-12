import canvas = require('canvas')
import { Client } from './src/client'
import { Collection } from 'discord.js'
import express = require('express')
import fs = require('fs')
import path = require('path')

const app = express()

if (process.platform === 'win32') {
  // win32
  canvas.registerFont(path.resolve(__dirname, '../fonts/Inconsolata.otf'), {
    family: 'inconsolata'
  })
} else {
  // *nix
  canvas.registerFont(path.resolve(__dirname, '../fonts/NotoSansCJK-Regular.ttc'), {
    family: 'noto-sans'
  })
}

let client = new Client({
  disableEveryone: true
})

process.on('unhandledRejection', console.error)


fs.readdir(path.resolve(__dirname, './src/events/'), (err, files) => {
  if (err) throw err

  files.forEach(file => {
    let eventName = file.split('.')[0]
    let func = require(`./src/events/${file}`)
    client.on(eventName, func.bind(null, client, client.Discord))
    console.log(`Event ${eventName} loaded`)
  })
})

client.Discord.login(client.config.DiscordToken).then(() => console.log(`I'm in!'`))
