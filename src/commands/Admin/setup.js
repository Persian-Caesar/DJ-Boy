const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ChannelType
} = require("discord.js");
const error = require("../../functions/error");
const response = require("../../functions/response");
const panelEmbed = require("../../functions/panelEmbed");
const playerMenuComponents = require("../../functions/playerMenuComponents");
const playerButtonComponents = require("../../functions/playerButtonComponents");

module.exports = {
  name: "setup",
  description: "ثبت پنل موزیک پلیر در سرور.",
  category: "admin",
  aliases: ["setup", "set", "st"],
  usage: "[channel | id]",
  type: ApplicationCommandType.ChatInput,
  cooldown: 10,
  user_permissions: ["ManageChannels", "ManageGuild", "SendMessages"],
  bot_permissions: ["ManageChannels", "SendMessages", "EmbedLinks"],
  options: [
    {
      name: "channel",
      description: "چنل مورد نظر را انتخاب کنید.",
      type: ApplicationCommandOptionType.Channel,
      channelTypes: [ChannelType.GuildText],
      required: false
    },
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
  only_message: true,
  only_slash: true,

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").CommandInteraction} interaction 
   * @param {Array<string>} args 
   * @returns {void}
   */
  run: async (client, interaction, args) => {
    try {
      const db = client.db;
      let channel;
      if (interaction.user)
        channel = interaction.options.getChannel("channel") || interaction.channel;
      else
        channel = interaction.mentions.channels.first() || interaction.guild.channels.cache.get(args[0]) || interaction.channel;

      const embed = panelEmbed(client, interaction);
      const components = await playerMenuComponents();
      for (const actionRow of await playerButtonComponents()) {
        for (const button of actionRow.components) {
          button.setDisabled(true);
        }
        components.push(actionRow);
      };
      const message = await channel.send({
        embeds: [embed],
        components: components
      });
      await db.init();
      await db.set(`musicPanel.${interaction.guild.id}`, { channel: channel.id, message: message.id });
      return await response(interaction, {
        content: `پنل موزیک پلیر سرور با موفقیت در چنل ${channel} ثبت شد.`
      });
    } catch (e) {
      error(e)
    }
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