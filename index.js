/**
 * @license
  BSD 3-Clause License

  Copyright (c) 2021-2025, the respective contributors, as shown by Persian Caesar and Sobhan.SRZA (mr.sinre) file.

  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

  * Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

  * Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
  OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


// Packages

// load .env file
require("dotenv").config();
const { LavalinkManager } = require("@persian-caesar/discord-player");
const
  {
    Client,
    Collection,
    GatewayIntentBits,
    Partials
  } = require("discord.js"),
  clc = require("cli-color"),
  fs = require("fs"),
  package = require("./package.json"),
  error = require("./src/functions/error.js"),
  post = require("./src/functions/post.js"),
  handle = fs.readdirSync("./src/handlers").filter(file => file.endsWith(".js")),
  config = require("./config.js"),
  client = new Client({
    intents: Object.values(GatewayIntentBits).filter(a => !isNaN(a) && a !== "GuildPresences"),
    partials: Object.values(Partials).filter(a => !isNaN(a))
  });

client.prefix = config.discord.prefix;
client.token = config.discord.token;
client.commands = new Collection();
client.cooldowns = new Collection();


// Player setup
client.players = new Collection();
client.manager = new LavalinkManager(client, {
  send(id, payload) {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
  nodes: [
    {
      "host": "lava-all.ajieblogs.eu.org",
      "port": 80,
      "password": "https://dsc.gg/ajidevserver",
      "secure": false
    },
    {
      "host": "lava-all.ajieblogs.eu.org",
      "port": 443,
      "password": "https://dsc.gg/ajidevserver",
      "secure": true
    },
    {
      "host": "lava-v4.ajieblogs.eu.org",
      "port": 443,
      "password": "https://dsc.gg/ajidevserver",
      "secure": true
    },
    {
      "host": "lavalinkv4.serenetia.com",
      "port": 443,
      "password": "https://dsc.gg/ajidevserver",
      "secure": true
    },
    {
      "host": "pool-us.alfari.id",
      "port": 443,
      "password": "alfari",
      "secure": true
    },
    {
      "host": "pool-sg.alfari.id",
      "port": 443,
      "password": "alfari",
      "secure": true
    },
    {
      "host": "lavalink_v4.muzykant.xyz",
      "port": 443,
      "password": "https://discord.gg/v6sdrD9kPh",
      "secure": true
    },
    {
      "host": "lavalink_v3.muzykant.xyz",
      "port": 443,
      "password": "https://discord.gg/v6sdrD9kPh",
      "secure": true
    },
    {
      "host": "lavalink-v4.triniumhost.com",
      "port": 443,
      "password": "free",
      "secure": true
    },
    {
      "host": "lavalink-v3.triniumhost.com",
      "port": 443,
      "password": "free",
      "secure": true
    },
    {
      "host": "lavalink.jirayu.net",
      "port": 443,
      "password": "youshallnotpass",
      "secure": true
    },
    {
      "host": "lavalink.jirayu.net",
      "port": 13592,
      "password": "youshallnotpass",
      "secure": false
    },
    {
      "host": "lavahatry4.techbyte.host",
      "port": 3000,
      "password": "NAIGLAVA-dash.techbyte.host",
      "secure": false
    },
    {
      "host": "lava-v4.ajieblogs.eu.org",
      "port": 80,
      "password": "https://dsc.gg/ajidevserver",
      "secure": false
    },
    {
      "host": "lavalinkv4.serenetia.com",
      "port": 80,
      "password": "https://dsc.gg/ajidevserver",
      "secure": false
    },
    {
      "host": "173.249.0.115",
      "port": 13592,
      "password": "https://camming.xyz",
      "secure": false
    },
    {
      "host": "107.150.58.122",
      "port": 4006,
      "password": "https://discord.gg/mjS5J2K3ep",
      "secure": false
    },
    {
      "host": "5.39.63.207",
      "port": 8893,
      "password": "https://discord.gg/mjS5J2K3ep",
      "secure": false
    },
    {
      "host": "181.215.45.8",
      "port": 2333,
      "password": "kirito",
      "secure": false
    },
    {
      "host": "181.215.45.8",
      "port": 2334,
      "password": "free",
      "secure": false
    }
  ]
});

// Load Handlers 
let amount = 0;
post(
  clc.cyanBright(`Welcome to ${clc.blueBright(package.name)}! | Version: ${clc.blueBright(package.version)}`) + "\n" +
  `Coded By ${clc.yellow("Sobhan-SRZA")} & ${clc.yellow("Persian Caesar")} With ${clc.redBright("❤️")}` + "\n" +
  `Discord: ${clc.blueBright("Mr.Sinre")} | ${clc.blueBright("mr.sinre")} | ${clc.blueBright("https://dsc.gg/persian-caesar")}`,
  "W",
  "magentaBright",
  "cyanBright"
);
post("Logging into the BOT...", "S", "yellowBright", "greenBright");
handle.forEach((file) => {
  require(`./src/handlers/${file}`)(client);
  amount += 1;
});
post(`${clc.cyanBright(amount)} Handler Is Loaded!!`, "S", "yellowBright", "greenBright");

// Login 
if (client.token) {
  client.login(client.token).catch(e => {
    post("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!!", "E", "red", "redBright");
    error(e);
  });
} else {
  post("Please Write Your Bot Token Opposite The Token In The config.js File In Your Project!!", "E", "red", "redBright");
};

if (config.source.anti_crash) {
  process.on("unhandledRejection", (reason) => error(reason));
  process.on("rejectionHandled", (promise) => error(promise));
  process.on("uncaughtException", (e) => error(e));
  process.on("uncaughtExceptionMonitor", (e) => error(e));
};
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */