const {
  canModifyQueue,
  YOUTUBE_API_KEY,
  SOUNDCLOUD_CLIENT_ID,
  LOCALE,
  DEFAULT_VOLUME,
  MAX_PLAYLIST_SIZE
} = require("./../../util/AdUtil");
const i18n = require("i18n");
i18n.setLocale(LOCALE);

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: i18n.__('resume.description'),
  async execute(message, args, client) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(i18n.__("resume.errorNotQueue")).catch(console.error);
    if (!canModifyQueue(message.member)) return i18n.__("common.errorNotChannel");

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel
        .send(i18n.__mf("resume.resultNotPlaying", { author: message.author }))
        .catch(console.error);
    }

    return message.reply(i18n.__("resume.errorPlaying")).catch(console.error);
  }
};