const error = require("./error");
const { QueueRepeatMode } = require("discord-player");

/**
 * 
 * @param {import("discord-player").GuildQueue} queue 
 * @returns {string}
 */
module.exports = async function (queue) {
    try {
        const volume = queue.node.volume || "";
        const isShuffle = queue.isShuffling ? "Yes" : "No";
        let loop = "";
        if (queue.repeatMode === QueueRepeatMode.QUEUE)
            loop = "QUEUE";

        else if (queue.repeatMode === QueueRepeatMode.TRACK)
            loop = "TRACK";

        else if (queue.repeatMode === QueueRepeatMode.AUTOPLAY)
            loop = "AUTOPLAY";

        else
            loop = "OFF";

        let bar = "";
        try {
            bar = `\n\n${queue.node.createProgressBar()}`;
        } catch {
        }
        return `**Volume: ${volume}%\nShuffle: ${isShuffle}\nRepeat Mode: ${loop}${bar}**`;
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