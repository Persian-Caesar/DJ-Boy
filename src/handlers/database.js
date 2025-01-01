const {
  QuickDB,
  JSONDriver
} = require("quick.db");
const clc = require("cli-color");
const error = require("../functions/error");
const post = require("../functions/post");

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
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/