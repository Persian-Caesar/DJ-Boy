const { ActivityType } = require("discord.js");
module.exports = {
  token: process.env.token || "", // Bot token from .env or place in here.
  prefix: process.env.prefix || "", // Push bot message commands prefix in here.
  onlyOneGuild: false, // Push bot message commands prefix in here.
  support: {
    serverId: process.env.serverId || "", // Place a discord server id in here.
    // serverId: false // Push bot message commands prefix in here.
  },
  webhook: {
    url: process.env.webhook,
    avatar: "https://cdn.discordapp.com/avatars/1135247240252883006/f9130ef1f18aac78ec29dd2b79da0341.png",
    username: "DJ Boy | Logger"
  },
  source: {
    database: {
      type: "json", // Can be: "sql" | "json" | "mysql" | "mongodb" 
      mongoURL: process.env.mongodb || "", // If you choosed mongodb as a database type fill out here.
      mysql: {
        host: process.env.mysqlHost || "", // If you choosed mysql as a database type fill out here.,
        database: process.env.mysqlDatabase || "", // If you choosed mysql as a database type fill out here.
        user: process.env.mysqlUser || "", // If you choosed mysql as a database type fill out here.
        password: process.env.mysqlPassword || "" // If you choosed mysql as a database type fill out here.
      }
    },
    status: {
      activity: [
        "Build by mr.sinre",
        "Servers {guilds}",
        "Members {members}"
      ], // Set bot status activity, you can change it.
      type: [
        ActivityType.Competing,
        ActivityType.Watching
      ], // Can be: ActivityType.Competing | ActivityType.Listening | ActivityType.Playing | ActivityType.Streaming | ActivityType.Watching
      presence: [
        "idle"
      ] // Can be: "online" | "dnd" | "idle" | "offline"
    },
    youtubeSearchOptions: {
      maxResults: 1,
      key: process.env.youtubeApiKey,
      type: 'video'
    },
    spotifyClientId: process.env.spotifyClientId,
    spotifyClientSecret: process.env.spotifyClientSecret,
    soundcloudClientId: process.env.soundcloudClientId
  },
  owners: [
    "986314682547716117",
    "140492564309475328"
  ] // Place bot developers user id in here.
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