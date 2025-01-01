const fs = require("fs");
const error = require(`${process.cwd()}/functions/error`);
const clc = require("cli-color");
const post = require(`${process.cwd()}/functions/post`);
module.exports = async (client) => {
  try {
    let amount = 0;
    const slashCommandsArray = [];
    fs.readdirSync(`${process.cwd()}/commands/`).forEach((dir) => {
      const slashCommands = fs.readdirSync(`${process.cwd()}/commands/${dir}/`).filter((file) => file.endsWith(".js"));
      for (const file of slashCommands) {
        const command = require(`${process.cwd()}/commands/${dir}/${file}`);
        if (command.name && command.only_slash) {
          client.commands.set(command.name, command);
          slashCommandsArray.push(command);
          amount++;
        } else {
          post(`Slash Command Not Loaded: ${file}`, "E", "red", "redBright");
          continue;
        }
      }
    });
    post(`${clc.cyanBright(amount)} Slash Commands Is Loaded!!`, "S");

    client.on("ready", async () => {
      try {
        if (client.config.source.onlyOneGuild) {
          await client.guilds.cache.get(client.config.serverId).commands.set(slashCommandsArray);
        } else {
          await client.application.commands.set(slashCommandsArray);
        }
      } catch (error) {
        error(e);
        console.log(error);
      }
    })
  } catch (e) {
    error(e);
  }
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