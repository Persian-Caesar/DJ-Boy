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
  name: "volume",
  aliases: ["v", "vol"],
  description: i18n.__("volume.description"),
  async execute(message, args, client) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply(i18n.__("volume.errorNotQueue")).catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply(i18n.__("volume.errorNotChannel")).catch(console.error);

    if (!args[0]) return message.reply(i18n.__mf("volume.currentVolume", { volume: queue.volume })).catch(console.error);
    if (isNaN(args[0])) return message.reply(i18n.__("volume.errorNotNumber")).catch(console.error);
    if (Number(args[0]) > 200 || Number(args[0]) < 0)
      return message.reply(i18n.__("volume.errorNotValid")).catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    return queue.textChannel.send(i18n.__mf("volume.result", { arg: args[0] })).catch(console.error);
  }
};;
