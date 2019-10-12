import { Config } from './config'

let cfg = new Config()

export default {
  test: `this is a test snippet. here's the bot token: ${cfg.DiscordToken}`
}
