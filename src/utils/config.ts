import fs = require('fs')
import path = require('path')

export class Config {
  public Prefix: string

  public DiscordToken: string

  public LastFM: {
    APIKey: string
  }

  public YouTube: {
    APIKey: string
  }

  public Spotify: {
    ID: string,
    Secret: string
  }

  public BotOwnerID: string

  public constructor() {
    const cp = path.resolve(__dirname, '../../../config.json')

    fs.exists(cp, (exists: boolean) => {
      if (!exists) {
        console.log(`No config.json file found! The example config file will be used.`);

        fs.copyFile(path.resolve(__dirname, '../../../config.example.json'), cp, (err: NodeJS.ErrnoException) => {
          if (err) throw err

          console.log('Config file created. Please add in any required information for the bot\'s config ')
        })
      }
    })

    try {
      let c = require(cp)

      this.Prefix = c.prefix
      this.DiscordToken = c.discordToken
      this.LastFM = c.lastFM
      this.YouTube = c.youtube
      this.Spotify = c.spotify
      this.BotOwnerID = c.botOwnerID
    } catch (ex) {
      console.error('An exception was thrown loading configuration!')
      console.error(ex)
    }
  }
}
