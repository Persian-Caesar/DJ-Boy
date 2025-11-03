const error = require("./error");

/**
 * 
 * @param {import("discord.js").Message} mainMessage 
 * @param {import("discord.js").Message} message 
 * @param {number} timeout 
 * @returns {void}
 */
module.exports = async function (mainMessage, message = null, timeout = 5 * 1000) {
    try {
        setTimeout(async () => {
            await mainMessage.delete();
            if (message) await message.delete();
        }, timeout);
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