const { EmbedBuilder } = require("discord.js");
const error = require("../../functions/error");
const playerDescription = require("../../functions/playerDescription");
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
    const embed = new EmbedBuilder()
      .setTitle(`${track.title}`)
      .setURL(`${track.url}`)
      .setDescription(await playerDescription(queue))
      .setFields([
        {
          name: `Music From:`,
          value: `**${track.author}**`
        },
        {
          name: `Duration:`,
          value: `**${track.duration}**`
        }
      ])
      .setColor(queue.guild.members.me.displayHexColor)
      .setTimestamp();

    if (track.thumbnail) embed.setThumbnail(track.thumbnail);

    await db.init();
    const panel = await db.get(`musicPanel.${queue.guild.id}`);
    if (panel && queue.metadata.channel.id === panel.channel) {
      const message = await queue.metadata.channel.messages.fetch(panel.message);
      const components = await playerMenuComponents(queue);
      for (const actionRow of await playerButtonComponents()) {
        components.push(actionRow)
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