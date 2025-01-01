const { canModifyQueue,LOCALE } = require("./../../util/AdUtil");
const i18n = require("i18n");

i18n.setLocale(LOCALE);

module.exports = {
  name: "disconnect",
  aliases: ["dc"],
  category: "Music",
  description: i18n.__('disconnect.description'),
  async execute(message, args, client) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply(i18n.__("stop.errorNotQueue")).catch(console.error);
    if (!canModifyQueue(message.member)) return i18n.__("common.errorNotChannel");

    queue.connection.dispatcher.end(true);
    message.guild.me.voice.channel.leave(true);
    queue.textChannel.send(i18n.__mf("stop.result", { author: message.author })).catch(console.error);
        message.react("👋🏼")
  }
};



