const error = require("./error");

/**
 * 
 * @param {import("@persian-caesar/discord-player").MusicPlayer} player 
 * @returns {string}
 */
module.exports = function (player) {
    try {
        const volume = player.getVolume() || "";
        const isShuffle = player.isShuffiled() ? "Yes" : "No";
        const loop = player.isLoopQueue()
            ? "🔁 Queue Loop"
            : player.isLoopTrack()
                ? "🔂 Track Loop"
                : "🚫 Loop is diactivated";

        return `**Volume: ${volume}%\nShuffle: ${isShuffle}\nRepeat Mode: ${loop}**`;
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