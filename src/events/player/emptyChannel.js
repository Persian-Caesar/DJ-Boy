const { EmbedBuilder } = require("discord.js");
const error = require("../../functions/error");
const timeoutDelete = require("../../functions/timeoutDelete");
const panelEmbed = require("../../functions/panelEmbed");
const playerMenuComponents = require("../../functions/playerMenuComponents");
const playerButtonComponents = require("../../functions/playerButtonComponents");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord-player").GuildQueue} queue 
 * @param {import("discord-player").Track} track 
 * @returns {void}
 */
module.exports = async (client, queue, track) => {
  try {
    const db = client.db;
    await db.init();
    const embed1 = panelEmbed(client, queue);
    const embed2 = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
      .setColor(queue.guild.members.me.displayHexColor)
      .setDescription("Feeling lonely, leaving now.");

    await queue.metadata.channel.send({
      embeds: [embed2]
    })
      .then(async msg => timeoutDelete(msg)).catch(error);

    const panel = await db.get(`musicPanel.${queue.guild.id}`);
    if (queue && panel && queue.metadata.channel.id === panel.channel) {
      const message = queue.metadata.channel.messages.cache.get(panel.message);
      const components = await playerMenuComponents();
      for (const actionRow of await playerButtonComponents()) {
        for (const button of actionRow.components) {
          button.setDisabled(true);
        }
        components.push(actionRow);
      };
      return await message.edit({
        embeds: [embed1],
        components: components
      }).catch(error);
    }
  } catch (e) {
    error(e)
  }
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