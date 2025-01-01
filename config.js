const { ActivityType } = require("discord.js");
module.exports = {
  source: {
    anti_crash: true, // Anticrash on or off
    one_guild: false, // One Guild on or off
    logger: false, // Webhook logger on or off
  },
  discord: {
    token: process.env.token || "", // Bot token.
    prefix: process.env.prefix || "", // Bot message command prefix.
    status: {
      activity: [
        "Build by Sobhan-SRZA (mr.sinre)",
        "Working in {servers} Servers",
        "Work for {members} Members"
      ], // Set bot status activity, you can change it. | You can use "{members}" variable to shows bot all users.
      type: [
        ActivityType.Custom
      ], // Can be: ActivityType.Competing | ActivityType.Listening | ActivityType.Playing | ActivityType.Streaming | ActivityType.Watching
      presence: [
        "dnd"
      ] // Can be: "online" | "dnd" | "idle" | "offline"
    },
    webhook: {
      url: process.env.webhook_url || "", // Webhook logger url.
      avatar: process.env.webhook_avatar || "", // Webhook logger avatar.
      username: process.env.webhook_username || "" // Webhook logger username.
    }
  }
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/