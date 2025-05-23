const
  error = require("./error"),
  post = require("./post"),
  fs = require("fs");

/**
 *
 * @param {string} dirname folder of commands path
 * @param {"only_slash"|"only_message"} type 
 * @param {Map} object commands object like client.commands
 * @returns {void}
 */
module.exports = async function (dirname, type, object) {
  try {
    fs.readdirSync(`${dirname}`).forEach(async dirs => {
      const commandFiles = fs
        .readdirSync(`${dirname}/${dirs}`)
        .filter(files => files.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`${dirname}/${dirs}/${file}`);
        if (command[type])
          // object.set(command.data.name, command);
          object.set(command.name, command);

        else {
          post(
            `${firstUpperCase(type.replace("only_", ""))} Command Not Loaded: ${file}`,
            "E",
            "red",
            "redBright"
          );
          continue;
        }
      }
    });
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