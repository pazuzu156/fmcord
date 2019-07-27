const Command = require(`../classes/Command`);
const Library = require(`../lib/index.js`);
const { fetchuser } = require(`../utils/fetchuser`);
const { RichEmbed } = require(`discord.js`);

class ListCommand extends Command {

  constructor() {
    super({
      name: `list`,
      description: `Provides you a list of your top songs or artists.`,
      usage: `list <list type> <time period> <list length>`,
      notes: `In \`list type\`, you can have \`artists\` or \`songs\`. ` +
      `In \`time period\`, you can have \`weekly\`, \`monthly\` or ` +
      `\`alltime\`. List must not be longer than 25 elements. \`Time period\` ` +
      `and \`list length\` can be omitted, then it defaults to weekly top 10. ` +
      `You can type the first letter of the parameter as a shortcut.`,
      aliases: [`l`, `top`],
      dmAvailable: true,
    });
  }

  async run(client, message, args) {
    this.setContext(message);
    try {
      const color = message.member ? message.member.displayColor : 16777215;
      const lib = new Library(client.config.lastFM.apikey);
      const fetchUser = new fetchuser(client, message);
      const user = await fetchUser.username();
      if (!user) {
        await message.reply(client.snippets.noLogin);
        this.context.reason = client.snippets.commonReasons.noLogin;
        throw this.context;
      }
      const lfmInfo = await lib.user.getInfo(user);
      let data,
        mapFunc,
        timePeriod = `7day`,
        num = 0,
        rootProp,
        subProp,
        period,
        listLength;
      switch (args[1]) {
      case `weekly`:
      case `w`:
        timePeriod = `7day`;
        period = `weekly`;
        break;
      case `monthly`:
      case `m`:
        timePeriod = `1month`;
        period = `monthly`;
        break;
      case `alltime`:
      case `a`:
        timePeriod = `overall`;
        period = `alltime`;
        break;
      default:
        timePeriod = `7day`;
        period = `weekly`;
        if (!isNaN(parseInt(args[1]))) {
          listLength = parseInt(args[1]);
          if (listLength > 25) {
            await message.reply(`list size is too big, it must be lower than or 25!`);
            this.context.reason = `Requested list size was too big.`;
            throw this.context;
          }
        }
        break;
      }
      if (args[0] === `artists` || args[0] === `a`) {
        data = await lib.user.getTopArtists(user, timePeriod);
        mapFunc = x => `${++num}. **${x.name}** - ${x.playcount} plays`;
        [rootProp, subProp] = [`topartists`, `artist`];
      } else if (args[0] === `songs` || args[0] === `s`) {
        data = await lib.user.getTopTracks(user, timePeriod);
        mapFunc = x => `${++num}. **${x.name}** by **${x.artist.name}** - ${x.playcount} plays`;
        [rootProp, subProp] = [`toptracks`, `track`];
      } else {
        await message.reply(`you haven't defined a proper list type! Correct usage ` +
        `would be \`${client.config.prefix}list <list type> <time period> <list length>\``);
      }
      if (!listLength) {
        listLength = parseInt(args[2]);
        if (listLength > 25) {
          await message.reply(`list size is too big, it must be lower than or 25!`);
          this.context.reason = `Requested list size was too big.`;
          throw this.context;
        } else if (isNaN(listLength)) {
          listLength = 10;
        }
      }
      const arr = data[rootProp][subProp].slice(0, listLength);
      const embed = new RichEmbed()
        .setDescription(arr
          .map(mapFunc)
          .join(`\n`))
        .setColor(color)
        .setThumbnail(message.author.avatarURL)
        .setURL(lfmInfo.user.url)
        .setTitle(`${user}'s ${period} top ${arr.length} ${subProp}s`)
        .setFooter(`Command executed by ${message.author.tag}`, message.author.avatarURL)
        .setTimestamp();
      await message.channel.send({ embed });
      return this.context;
    } catch (e) {
      this.context.stack = e.stack;
      throw this.context;
    }
  }

}

module.exports = ListCommand;
