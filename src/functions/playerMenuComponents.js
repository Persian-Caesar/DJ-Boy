const {
    ActionRowBuilder,
    StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder
} = require("discord.js");

/**
 * 
 * @param {import("discord-player").GuildQueue} queue 
 * @returns {Array<import("discord.js").ActionRow<import("discord.js").StringSelectMenuBuilder>>}
 */
module.exports = function (queue = null) {
    const menu = new StringSelectMenuBuilder()
        .setCustomId("music-queue")
        .setPlaceholder("No music in the queue.")
        .setDisabled(true)
        .setOptions({
            label: "none",
            value: "none"
        });

    if (queue && queue.size > 1) {
        menu
            .setPlaceholder(`${queue.size} songs in queue.`)
            .setOptions(
                queue.tracks.toArray()
                    .slice(0, 25)
                    .map((song, index) =>
                        new StringSelectMenuOptionBuilder()
                            .setLabel(
                                `${index + 1}. ${song.cleanTitle.length >= 95 ? `${song.cleanTitle.slice(0, 91)}...` : `${song.cleanTitle}`}`
                            )
                            .setValue(index.toString())
                    )
            )
            .setDisabled(false);
    }

    return [
        new ActionRowBuilder()
            .addComponents(menu)
    ];
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */