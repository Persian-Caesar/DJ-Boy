const {
  QuickDB,
  JSONDriver
} = require("quick.db");
const error = require("../functions/error");
const post = require("../functions/post");
const clc = require("cli-color");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns {void}
 */
module.exports = async (client) => {
  try {
    const db = new QuickDB({
      driver: new JSONDriver()
    });
    await db.init();
    client.db = db;
    post(`Database Is Successfully Activated!!`, "S")
  } catch (e) {
    post(`${clc.red(`Database Doesn't Work!!`)}`, "E", "red", "redBright")
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