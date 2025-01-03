const
  error = require("../../functions/error"),
  sendGuildAlert = require("../../functions/sendGuildAlert"),
  replaceValues = require("../../functions/replaceValues");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Guild} guild 
 * @returns {void}
 */
module.exports = async (client, guild) => {
  try {
    return await sendGuildAlert({
      client,
      guild,
      isWebhook: true,
      description: replaceValues("**-# I’ve recently joined a new server, now I’m in `{guilds}` servers.**", {
        guilds: client.guilds.cache.size.toLocaleString()
      })
    })
  } catch (e) {
    error(e)
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */