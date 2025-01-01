const {
    ButtonBuilder,
    ActionRowBuilder
} = require("discord.js");
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
        for (const actionRow of buttons) {
            for (const button of actionRow.components) {
                if (customId == button.data.custom_id) {
                    button.setCustomId(id).setEmoji(emote);
                };
            };
        };
        return buttons;
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