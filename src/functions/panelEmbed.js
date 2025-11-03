const { EmbedBuilder } = require("discord.js");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @returns {import("discord.js").EmbedBuilder} 
 */
module.exports = function (client, message) {
    return new EmbedBuilder()
        .setTitle("Music Controller")
        .setDescription("**-# Waiting for music...\n-# Send the name or link of a music.**")
        .setImage("https://media.discordapp.net/attachments/1180530594606760028/1266346269358424074/mic-1132528_1920-min-1024x678.webp")
        .setFooter({
            text: `${client.user.displayName} • Music Panel`,
            iconURL: client.user.displayAvatarURL({ forceStatic: true })
        })
        .setColor(message.guild.members.me.displayHexColor);
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */