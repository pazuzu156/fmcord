import { Config } from './src/utils/config'
import path = require('path')
import { ShardingManager, Shard } from 'discord.js'

let config = new Config()
let manager = new ShardingManager(path.resolve(__dirname, 'bot.js'), { token: config.DiscordToken })
manager.spawn().catch(console.error)
manager.on('launch', shard => console.log(`Launched shard ${shard.id}.`))

manager.on('message', (shard: Shard, message: any) => {
  console.log(`Shard[${shard.id}] : `, message._eval, ':', message._result)

  if (message._error) {
    console.error(message._error)
  }
})
