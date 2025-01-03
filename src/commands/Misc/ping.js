const {
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
const error = require("../../functions/error");
const editResponse = require("../../functions/editResponse");
const response = require("../../functions/response");
module.exports = {
  name: "ping",
  description: "پینگ بات.",
  category: "misc",
  type: ApplicationCommandType.ChatInput,
  cooldown: 5,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  options: [
    {
      name: "ephemeral",
      description: "آیا این پیغام پنهان باشد؟",
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: "Enable",
          value: "true"
        },
        {
          name: "Disable",
          value: "false"
        }
      ],
      required: false
    }
  ],
  only_slash: true,
  only_message: true,

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").CommandInteraction} interaction 
   * @param {Array<string>} args 
   * @returns {void}
   */
  run: async (client, interaction, args) => {
    const embed1 = new EmbedBuilder()
      .setColor("Aqua")
      .setDescription("Pinging...");

    const message = await response(interaction, { ephemeral: true, embeds: [embed1] }).catch(error);

    const embed2 = new EmbedBuilder()
      .setColor("Aqua")
      .setTitle("🏓 Pong")
      .setDescription(`💓: ${Math.round(client.ws.ping)} ms
⏱️: ${Date.now() - interaction.createdTimestamp} ms`);

    return await editResponse({ interaction, message, data: { embeds: [embed2] } });
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