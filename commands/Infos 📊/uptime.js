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
  name: "uptime",
  aliases: ["u"],
  category: "Info",
  description: i18n.__('uptime.description'),
  execute(message) {
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    return message
      .reply(i18n.__mf('uptime.result', {days: days, hours: hours, minutes: minutes, seconds: seconds}))
      .catch(console.error);
  }
};