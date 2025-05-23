const
  {
    ActivityType,
    Routes,
    REST
  } = require("discord.js"),
  clc = require("cli-color"),
  os = require("os"),
  post = require("../../functions/post"),
  error = require("../../functions/error"),
  logger = require("../../functions/logger"),
  database = require("../../functions/database"),
  config = require("../../../config"),
  chooseRandom = require("../../functions/chooseRandom"),
  replaceValues = require("../../functions/replaceValues");

/**
 *
 * @param {import("discord.js").Client} client
 * @returns {void}
 */
module.exports = async client => {
  try {
    // Load Slash Commands
    const
      commands = client.commands
        .filter(a => a.only_slash)
        // .map(a => a.data),
        .map(a => a),
        
      rest = new REST()
        .setToken(client.token),

      db = new database(client.db);

    // Start to upload all commands to api
    let data;
    post(
      `Updating ${clc.cyanBright(commands.length)} slash (/) commands.`,
      "S"
    );

    // Create commands
    data = await rest.put(
      Routes.applicationCommands(client.user.id),
      {
        body: commands
      }
    );
    post(
      `${clc.cyanBright(data.length)} slash (/) commands successfully reloaded.`,
      "S"
    );

    // Change Bot Status
    setInterval(async function () {
      if (config.discord.status.activity.length < 1) return;

      const
        Presence = chooseRandom(config.discord.status.presence || ["online"]),
        Activity = chooseRandom(config.discord.status.activity),
        Type = chooseRandom(config.discord.status.type || ["Custom"]),
        stateName = replaceValues(Activity, {
          username: client.user.displayName.toLocaleString(),
          servers: client.guilds.cache.size.toLocaleString(),
          members: client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
          prefix: config.discord.prefix,
          usedCommands: (await db.get("totalCommandsUsed") || 0).toLocaleString()
        });

      client.user.setPresence({
        status: Presence,
        activities: [
          {
            type: ActivityType[Type],
            name: stateName,
            state: Type === "Custom" ? stateName : ""
          }
        ]
      });
    }, 30000);
    post(
      `${clc.blueBright(
        "Discord bot is online!"
      )}` +
      `\n` +
      `${clc.cyanBright(client.user.tag)} is now online :)`,
      "S"
    );
    logger(
      clc.blueBright("Working Guilds: ") +
      clc.cyanBright(`${client.guilds.cache.size.toLocaleString()} Servers`) +
      `\n` +
      clc.blueBright("Watching Members: ") +
      clc.cyanBright(
        `${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()} Members`
      ) +
      `\n` +
      clc.blueBright("Commands: ") +
      clc.cyanBright(
        `slashCommands[${commands.length}] & messageCommands[${client.commands.filter(a => a.only_message).size}]`
      ) +
      `\n` +
      clc.blueBright("Discord.js: ") +
      clc.cyanBright(`v${require("discord.js").version}`) +
      `\n` +
      clc.blueBright("Node.js: ") +
      clc.cyanBright(`${process.version}`) +
      `\n` +
      clc.blueBright("Plattform: ") +
      clc.cyanBright(`${process.platform} ${process.arch} | ${os.cpus().map((i) => `${i.model}`)[0]} | ${String(os.loadavg()[0])}%`) +
      `\n` +
      clc.blueBright("Memory: ") +
      clc.cyanBright(
        `${Math.round(
          (
            (os.totalmem() - os.freemem()) / 1024 / 1024
          )
            .toFixed(2)
        )
          .toLocaleString()
        }/${Math.round(
          (
            (os.totalmem()) / 1024 / 1024
          )
            .toFixed(2)
        )
          .toLocaleString()
        } MB | ${(
          (
            (os.totalmem() - os.freemem()) / os.totalmem()
          ) * 100)
          .toFixed(2)
        }%`
      )
    );

    // Add Slash Commands Id to Commands
    client.commands.forEach(async (command) => {
      const
        // cmd = client.commands.get(command.data.name),
        cmd = client.commands.get(command.name),
        slashCommand = (await client.application.commands.fetch({ cache: true }))
          // .find(a => a.name === command.data.name);
          .find(a => a.name === command.name);

      return await client.commands.set(
        // cmd.data.name,
        cmd.name,
        {
          ...cmd,
          // data: {
          //   id: slashCommand?.id,
          //   ...cmd.data
          // }
          id: slashCommand?.id
        }
      );
    });
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