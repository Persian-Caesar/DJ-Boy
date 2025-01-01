const fs = require("fs");
const clc = require("cli-color");
const post = require("../functions/post");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns
 */
module.exports = async (client) => {
  let amount = 0;
  fs.readdirSync(`${process.cwd()}/events`).forEach(dirs => {
    const events = fs.readdirSync(`${process.cwd()}/events/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of events) {
      const event = require(`${process.cwd()}/events/${dirs}/${file}`);
      client.on(file.split(".")[0], event.bind(null, client));
      amount += 1;
    };
  });
  post(`${clc.cyanBright(amount)} Events Is Loaded!!`, "S", "yellowBright", "greenBright");
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