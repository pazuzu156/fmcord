exports.run = async (client, message) => {
  try {
    await message.reply(`you can invite me to your server using this link: ` +
    `${client.snippets.dBotsLink}`);
  } catch (e) {
    console.error(e);
    await message.channel.send(client.snippets.error);
  }
};

exports.help = {
  name: `invite`,
  description: `Sends you a bot invitation link, by which you can invite this ` +
  `bot to your server.`,
  usage: `invite`
};
