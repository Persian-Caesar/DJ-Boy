const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

/**
 * 
 * @returns {Array<import("discord.js").ActionRow<import("discord.js").ButtonBuilder>>}
 */
module.exports = function () {
    return [
        new ActionRowBuilder()
            .addComponents([
                new ButtonBuilder()
                    .setCustomId("music-volumDown")
                    .setEmoji("🔈")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("music-lastTrack")
                    .setEmoji("⏮️")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("music-pause")
                    .setEmoji("⏸️")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("music-nextTrack")
                    .setEmoji("⏭️")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("music-volumUp")
                    .setEmoji("🔊")
                    .setStyle(ButtonStyle.Secondary)
            ]),

        new ActionRowBuilder()
            .addComponents([
                new ButtonBuilder()
                    .setCustomId("music-shuffle")
                    .setEmoji("🔀")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("music-seekBack")
                    .setEmoji("⏪")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("music-stop")
                    .setEmoji("❌")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("music-seekNext")
                    .setEmoji("⏩")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("music-loop")
                    .setEmoji("🔄")
                    .setStyle(ButtonStyle.Secondary)
            ])
    ];
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