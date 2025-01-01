const { EmbedBuilder } = require("discord.js");
const error = require("../../functions/error");
const timeoutDelete = require("../../functions/timeoutDelete");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord-player").GuildQueue} queue 
 * @param {import("discord-player").Track} track 
 * @returns {void}
 */
module.exports = async (client, queue, track) => {
    try {
        const embed = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setColor(queue.guild.members.me.displayHexColor)
            .setDescription(
                `👍 Joined ${queue.channel.toString()} and 📄 bouned ${queue.metadata.channel.toString()}`
            );

        return await queue.metadata.channel.send({ embeds: [embed] }).then(async msg => timeoutDelete(msg)).catch(error);;
    } catch (e) {
        error(e)
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