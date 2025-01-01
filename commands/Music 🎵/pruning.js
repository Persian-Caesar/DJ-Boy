const fs = require("fs");
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
let config;
try {
  config = require("./../../config.js");
} catch (error) {
  config = null;
}

module.exports = {
  name: "pruning",
  description: i18n.__('pruning.description'),
  async execute(message, args, client) {
    if (!config.opt.loopMessage) return;
    config.opt.loopMessage = !config.opt.loopMessage;

    fs.writeFile("./../../config.js", stringify(config.opt, null, 4), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send(i18n.__("pruning.errorWritingFile")).catch(console.error);
      }

      return message.channel
        .send(
          i18n.__("pruning.result", {
            result: config.opt.loopMessage ? i18n.__("common.enabled") : i18n.__("common.disabled")
          })
        )
        .catch(console.error);
    });
  }
};