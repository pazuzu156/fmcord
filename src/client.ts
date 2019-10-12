import { Config } from './utils/config'
import djs = require('discord.js')
import path = require('path')
import { Sequelize } from 'sequelize'

export class Client {
  public Discord: djs.Client

  public config: Config

  public commands: djs.Collection<any, any>

  public cooldowns: []

  public sequelize: any

  public snippets: any

  public executing: Set<any>

  public constructor(discordOptions?: djs.ClientOptions) {
    this.Discord = new djs.Client(discordOptions)
    this.config = new Config()
    this.commands = new djs.Collection()
    this.cooldowns = [];
    this.sequelize = this._sequelize()
    this.snippets = require('./utils/snippets')
    this.executing = new Set()
  }

  private _sequelize(): Sequelize {
    return new Sequelize('database', 'user', 'password', {
      host: 'localhost',
      dialect: 'sqlite',
      logging: false,
      storage: path.resolve(__dirname, '../../.data/database.sqlite')
    })
  }

  public on(event: string, listener: Function): djs.Client {
    return this.Discord.on(event, listener)
  }

  public async close(): Promise<void> {
    return this.Discord.destroy()
  }
}
