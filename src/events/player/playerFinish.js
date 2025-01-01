const error = require("../../functions/error");
const panelEmbed = require("../../functions/panelEmbed");
const playerButtonComponents = require("../../functions/playerButtonComponents");
const playerMenuComponents = require("../../functions/playerMenuComponents");

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
    const embed = panelEmbed(client, queue);
    const panel = await db.get(`musicPanel.${queue.guild.id}`);
    if (panel && queue.metadata.channel.id === panel.channel) {
      const message = queue.metadata.channel.messages.cache.get(panel.message);
      const components = await playerMenuComponents();
      for (const actionRow of await playerButtonComponents()) {
        for (const button of actionRow.components) {
          button.setDisabled(true);
        }
        components.push(actionRow);
      };
      return await message.edit({
        embeds: [embed],
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