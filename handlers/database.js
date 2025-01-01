const {
  QuickDB,
  JSONDriver,
  SqliteDriver,
  MySQLDriver
} = require("quick.db");
const post = require("../functions/post");
const clc = require("cli-color");
const error = require("../functions/error");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns
*/
module.exports = async (client) => {
  //======== Loading Database =========
  try {
    let driver;
    switch (client.config.source.database.type) {
      case "mongodb": {
        const { MongoDriver } = require("quickmongo");
        driver = new MongoDriver(client.config.source.database.mongoURL);
        await driver.connect();
      } break;
      case "mysql": {
        driver = new MySQLDriver(client.config.source.database.mysql);
        await driver.connect();
      } break;
      case "json": {
        driver = new JSONDriver();
      } break;
      case "sql": {
        driver = new SqliteDriver();
      } break;
    };
    const db = new QuickDB({ driver });
    await db.init();
    client.db = db;
    post(`Database Is Successfully Connected!!`, "S")
  } catch (e) {
    const matches = e.message.match(/Cannot find module '([^']+)'/);
    if (matches && matches.length >= 2) {
      const package = matches[1];
      post(`${clc.red(`Please install the ${package} package!! | npm i ${package}`)}`, "E", "red", "redBright")
    };
    post(`${clc.red(`Database Doesn't Connected!!`)}`, "E", "red", "redBright")
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