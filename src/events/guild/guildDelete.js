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
      description: replaceValues("**-# I’ve been removed from a server, but I’m still in `{guilds}` servers.**", {
        guilds: client.guilds.cache.size.toLocaleString()
      })
    })
  } catch (e) {
    error(e)
  }
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */