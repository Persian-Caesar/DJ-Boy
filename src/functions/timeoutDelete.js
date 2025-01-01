const error = require("./error");

/**
 * 
 * @param {import("discord.js").Message} mainMessage 
 * @param {import("discord.js").Message} message 
 * @returns {void}
 */
module.exports = async function (mainMessage, message = null) {
    try {
        setTimeout(async () => {
            await mainMessage.delete();
            if (message) await message.delete();
        }, 5 * 1000);
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