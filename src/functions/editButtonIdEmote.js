const error = require("./error");

/**
 *
 * @param {string} customId
 * @param {Array<import("discord.js").ActionRow<import("discord.js").ButtonBuilder>>} buttons 
 * @param {string} id 
 * @param {string} emote 
 * @returns {import("discord.js").ActionRow<import("discord.js").ButtonBuilder>}
 */
module.exports = async function (customId, buttons, id, emote) {
  try {
    for (const actionRow of buttons)
      for (const button of actionRow.components)
        if (customId == button.data.custom_id)
          button
            .setCustomId(id)
            .setEmoji(emote);

    return buttons;
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
