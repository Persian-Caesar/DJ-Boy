const {
    ActionRowBuilder,
    StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder
} = require("discord.js");

/**
 * 
 * @param {import("@persian-caesar/discord-player").TrackMetadata[]} queue 
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

    if (queue && queue.length > 0) {
        menu
            .setPlaceholder(`${queue.length} songs in queue.`)
            .setOptions(
                queue
                    .slice(0, 25)
                    .map((track, index) =>
                        new StringSelectMenuOptionBuilder()
                            .setLabel(
                                `${index + 1}. ${track.title.length >= 95 ? `${track.title.slice(0, 91)}...` : `${track.title}`}`
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