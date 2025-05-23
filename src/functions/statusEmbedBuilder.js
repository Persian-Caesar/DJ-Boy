const
  {
    EmbedBuilder
  } = require("discord.js"),
  error = require("./error"),
  os = require("os"),
  data = require("../storage/embed");
const database = require("./database");

/**
 *
 * @param {import("discord.js").Client} client
 * @returns {import("discord.js").EmbedBuilder}
 */
module.exports = async function (client) {
  try {
    const db = new database(client.db);
    return new EmbedBuilder()
      .setColor(data.color.theme)
      .setTitle("Bot Status")
      .addFields(
        [
          {
            name: `${data.emotes.default.server}| Total servers:`,
            value: `**\`${client.guilds.cache.size.toLocaleString()}\` Servers**`,
            inline: false
          },
          {
            name: `${data.emotes.default.users}| Total users:`,
            value: `**\`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\` Users**`,
            inline: false
          },
          {
            name: `${data.emotes.default.commands}| Commands:`,
            value: `**slashCommands[\`${client.commands.filter(a => a.only_slash).size}\`] & messageCommands[\`${client.commands.filter(a => a.only_message).size}\`]**`,
            inline: false
          },
          {
            name: `${data.emotes.default.heartbeat}| Response time:`,
            value: `**\`${Math.round(client.ws.ping)}\` ms | Total Commands Used: \`${(await db.get("totalCommandsUsed") || 0).toLocaleString()}\`**`,
            inline: false
          },
          {
            name: `${data.emotes.default.uptime}| Uptime:`,
            value: `**<t:${Math.round(client.readyTimestamp / 1000)}:D> | <t:${Math.round(client.readyTimestamp / 1000)}:R>**`,
            inline: false
          },
          {
            name: `${data.emotes.default.memory}| Memory:`,
            value: `**${Math.round(((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2)).toLocaleString()}/${Math.round(((os.totalmem()) / 1024 / 1024).toFixed(2)).toLocaleString()} MB | \`${(((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(2)}%\`**`,
            inline: false
          },
          {
            name: `${data.emotes.default.cpu}| CPU:`,
            value: `**${os.cpus().map((i) => `${i.model}`)[0]} | \`${String(os.loadavg()[0])}%\`**`,
            inline: false
          },
          {
            name: `${data.emotes.default.version}| Bot version:`,
            value: `**Source \`v${require("../../package.json").version}\` | Discord.JS \`v${require("discord.js").version}\`**`,
            inline: false
          }
        ]
      );
  } catch (e) {
    error(e);
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