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
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */