const
    { Player } = require("discord-player"),
    { DefaultExtractors } = require("@discord-player/extractor"),
    { YoutubeiExtractor, generateOauthTokens } = require("discord-player-youtubei"),
    error = require("../functions/error");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns {void}
 */
module.exports = async (client) => {
    try {
        const player = new Player(client);
        await player.extractors.loadMulti(DefaultExtractors);
        await player.extractors.register(YoutubeiExtractor, {
            authentication: await generateOauthTokens()
        });
        post("Load disocrd-player", "S", "yellowBright", "greenBright");
    } catch (e) {
        post("Faild to load disocrd-player", "S", "yellowBright", "greenBright");
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