import bot = require('../client')
import djs = require('discord.js')

export = async (_client: bot.Client, _discord: djs.Client) => {
  let guilds = await _discord.shard.fetchClientValues('guilds.size')
  let guildsSize = guilds.reduce((prev: number, guild: number) => prev + guild, 0)
  await _discord.user.setPresence({
    game: {
      name: `with ${guildsSize} servers | Do ${_client.config.Prefix}help!`
    },
    status: 'online'
  })

  // This ensures the bot logs out when you
  // Ctrl+C on the CLI
  process.on('SIGINT', () => {
    _client.close()
    process.exit()
  })
}
