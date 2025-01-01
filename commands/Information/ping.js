const {
  EmbedBuilder,
  ApplicationCommandOptionType
} = require("discord.js");
const error = require("../../functions/error");
module.exports = {
  name: "ping",
  description: "Response bot webstock ping.",
  cooldown: 5,
  aliases: [],
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  dm_permission: true,
  only_owner: false,
  only_message: true,
  only_slash: true,
  options: [{
    name: "ephemeral",
    description: "Hide this message?",
    choices: [{
      name: "Yes",
      value: "true"
    }, {
      name: "No",
      value: "false"
    }],
    type: ApplicationCommandOptionType.String,
    required: false
  }],

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Interaction} interaction 
   * @param {string} args 
   * @returns 
   */
  run: async (client, interaction, args) => {
    try {
      return interaction.reply({
        content: "Pong!! - " + client.ws.ping + "ms"
      })
    } catch (e) {
      error(e);
    }
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