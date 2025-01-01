const error = require("../functions/error");

/**
 * @returns {void}
 */
module.exports = async () => {
  process.on("unhandledRejection", (reason) => error(reason));
  process.on("rejectionHandled", (promise) => error(promise));
  process.on("uncaughtException", (e) => error(e));
  process.on("uncaughtExceptionMonitor", (e) => error(e));
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