const createORgetInvite = require("../../functions/createORgetInvite");

const
  {
    EmbedBuilder,
    ModalBuilder,
    TextInputStyle,
    TextInputBuilder,
    ActionRowBuilder,
    WebhookClient,
    ChannelType,
    MessageFlags
  } = require("discord.js"),
  error = require("../../functions/error"),
  copyRight = require("../../storage/embed"),
  config = require("../../../config"),
  database = require("../../functions/database"),
  replaceValues = require("../../functions/replaceValues");


/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Interaction} interaction 
 * @returns {void}
 */
module.exports = async (client, interaction) => {
  try {
    if (interaction.isButton()) {
      if (interaction.customId === "reportButton") {
        const modal = new ModalBuilder()
          .setTitle("Report")
          .setCustomId("reportModal")
          .addComponents(
            new ActionRowBuilder()
              .addComponents(
                new TextInputBuilder()
                  .setCustomId("reportModalMessage")
                  .setLabel("What would you like to report?")
                  .setPlaceholder("Example: Hi, when I used the bot, the help command didn't work.")
                  .setStyle(TextInputStyle.Paragraph)
              )
          );

        return await interaction.showModal(modal);
      };

    }

    else if (interaction.isModalSubmit()) {
      if (interaction.customId === "reportModal") {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const
          webhook = new WebhookClient({ url: config.discord.support.webhook.url }),
          message = interaction.fields.getTextInputValue("reportModalMessage");

        if (interaction.guild) {
          const
            invite = await createORgetInvite(interaction.guild);

          let owner;
          try {
            owner = await (await interaction.guild.fetchOwner()).user ||
              await client.users.cache.get(interaction.guild.ownerId);
          } catch { }
          const embed = new EmbedBuilder()
            .setAuthor(
              {
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ forceStatic: true })
              }
            )
            .setColor(copyRight.color.theme)
            .setDescription(
              replaceValues("**Report:**\n{message}\n\n**-# From {user}**", {
                message: message.toString().length < 3900 ? message.toString() : message.toString().slice(0, 3900) + " and more...",
                user: `${interaction.user} | \`${interaction.user?.tag}\` | \`${interaction.user?.id}\``
              })

            )
            .addFields(
              [
                {
                  name: `${copyRight.emotes.default.owner}| Owner:`,
                  value: `${copyRight.emotes.default.reply} **${owner} | \`${owner?.tag}\` | \`${owner?.id}\`**`,
                  inline: false
                },
                {
                  name: `${copyRight.emotes.default.server}| Server:`,
                  value: `${copyRight.emotes.default.reply} **${invite ? `[${interaction.guild.name}](${invite.url})` : `${interaction.guild.name}`} | \`${interaction.guild.id}\` | \`${interaction.guild.memberCount}\` Members**`,
                  inline: false
                },
                {
                  name: `${copyRight.emotes.default.date}| Created on:`,
                  value: `${copyRight.emotes.default.reply} **<t:${Date.parse(interaction.guild.createdAt) / 1000}:D> | <t:${Date.parse(interaction.guild.createdAt) / 1000}:R>**`,
                  inline: false
                }
              ]
            )
            .setThumbnail(interaction.guild.iconURL({ forceStatic: true }))
            .setTimestamp();

          await webhook.send({
            embeds: [embed],
            username: interaction.user.displayName,
            avatarURL: interaction.user.displayAvatarURL({ forceStatic: true }),
            threadId: config.discord.support.webhook.threads.report
          });
        }

        else {
          const embed = new EmbedBuilder()
            .setColor(copyRight.color.theme)
            .setDescription(
              replaceValues("**Report:**\n{message}\n\n**-# From {user}**", {
                message: message.toString().length < 3900 ? message.toString() : message.toString().slice(0, 3900) + " and more...",
                user: `${interaction.user} | \`${interaction.user?.tag}\` | \`${interaction.user?.id}\``
              })

            )
            .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
            .setTimestamp();

          await webhook.send({
            embeds: [embed],
            username: interaction.user.displayName,
            avatarURL: interaction.user.displayAvatarURL({ forceStatic: true }),
            threadId: config.discord.support.webhook.threads.report
          });
        }

        return await interaction.editReply({
          content: "```diff\n+ Your report has been successfully sent to the developers and will be reviewed within a few days.```"
        });
      }
    }
  } catch (e) {
    error(e);
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