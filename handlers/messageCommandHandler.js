const fs = require("fs");
const clc = require("cli-color");
const post = require("../functions/post");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns
 */
module.exports = async (client) => {
  fs.readdirSync(`${process.cwd()}/commands`).forEach(dirs => {
    const commands = fs.readdirSync(`${process.cwd()}/commands/${dirs}`).filter(files => files.endsWith(".js"));
    for (const file of commands) {
      const command = require(`${process.cwd()}/commands/${dirs}/${file}`);
      if (command.only_message) {
        client.commands.set(command.name, command);
      } else continue;
    };
  });
  post(`${clc.cyanBright(client.commands.filter(a => a.only_message).size)} Message Commands Is Loaded!!`, "S");
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