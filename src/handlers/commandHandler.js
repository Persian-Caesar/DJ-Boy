const
    firstUpperCase = require("../functions/firstUpperCase"),
    loadCommand = require("../functions/loadCommand"),
    post = require("../functions/post"),
    clc = require("cli-color");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns {void}
 */
module.exports = async (client) => {
    ["only_message", "only_slash"].forEach((type) => {
        loadCommand(`${process.cwd()}/src/commands`, type, client.commands);
        post(`${clc.cyanBright(client.commands.filter(a => a[type]).size)} ${firstUpperCase(type.replace("only_", ""))} Commands Is Loaded!!`, "S");
    });
};
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */