/**
 *
 * @param {string} string
 * @returns {boolean}
 */
module.exports = function (string) {
  const regex = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  const isValidURL = fetch(string)
    .then(fetched => {
      fetched.ok
    });

  if (regex.test(string))
    if (isValidURL)
      return true;

  return false;
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