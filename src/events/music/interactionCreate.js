const
  {
    EmbedBuilder
  } = require("discord.js"),
  {
    useQueue,
    QueueRepeatMode,
    useHistory
  } = require("discord-player"),
  error = require("../../functions/error"),
  panelEmbed = require("../../functions/panelEmbed"),
  playerDescription = require("../../functions/playerDescription"),
  editButtonIdEmote = require("../../functions/editButtonIdEmote"),
  playerMenuComponents = require("../../functions/playerMenuComponents"),
  playerButtonComponents = require("../../functions/playerButtonComponents"),
  database = require("../../functions/database");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").CollectedInteraction} interaction 
 * @returns {void}
 */
module.exports = async (client, interaction) => {
  try {
    const db = new database(client.db);
    if (!interaction.customId || !interaction.customId.startsWith("music"))
      return;

    const [__, id] = interaction.customId.split("-");

    const queue = useQueue(interaction.guild.id);
    const channel = interaction.member.voice.channel;
    if (!channel) {
      await interaction.deferReply({ ephemeral: true });
      return await interaction.editReply(`Please join voice channel OwO`);
    };
    if (interaction.isButton()) {
      switch (id) {
        case "volumDown": {
          await interaction.deferUpdate({ fetchReply: true });
          if (queue.node.volume <= 1);
          else {
            const volume = queue.node.volume - 5;
            queue.node.setVolume(volume);
          }
          const embed = new EmbedBuilder(interaction.message.embeds[0])
            .setDescription(await playerDescription(queue));

          return await interaction.editReply({
            embeds: [embed]
          });
          break;
        }

        case "lastTrack": {
          const history = useHistory(interaction.guildId);
          history.previous().catch(async () => {
            await interaction.deferReply({
              ephemeral: true
            });
            return await interaction.editReply({
              content: "No track to back to it."
            })
          });
          return await interaction.deferUpdate({ fetchReply: true });
          break;
        }

        case "play": {
          await interaction.deferUpdate({ fetchReply: true });
          const buttons = await editButtonIdEmote(interaction.component.customId, await playerButtonComponents(), "music-pause", "⏸️");
          queue.node.resume();
          const embed = new EmbedBuilder(interaction.message.embeds[0])
            .setDescription(await playerDescription(queue));

          const components = await playerMenuComponents(queue);
          for (const actionRow of buttons) {
            components.push(actionRow);
          };
          return await interaction.editReply({
            embeds: [embed],
            components: components
          });
          break;
        }

        case "pause": {
          await interaction.deferUpdate({ fetchReply: true });
          const buttons = await editButtonIdEmote(interaction.component.customId, await playerButtonComponents(), "music-play", "▶️");
          queue.node.pause();
          const embed = new EmbedBuilder(interaction.message.embeds[0])
            .setDescription(await playerDescription(queue));

          const components = await playerMenuComponents(queue);
          for (const actionRow of buttons) {
            components.push(actionRow);
          };
          return await interaction.editReply({
            embeds: [embed],
            components: components
          });
          break;
        }

        case "nextTrack": {
          queue.node.skip();
          return await interaction.deferUpdate({ fetchReply: true });
          break;
        }

        case "volumUp": {
          await interaction.deferUpdate({ fetchReply: true });
          if (queue.node.volume >= 100);
          else {
            const volume = queue.node.volume + 5;
            queue.node.setVolume(volume);
          }
          const embed = new EmbedBuilder(interaction.message.embeds[0])
            .setDescription(await playerDescription(queue));

          return await interaction.editReply({
            embeds: [embed]
          });
          break;
        }

        case "shuffle": {
          if (queue.isShuffling) queue.disableShuffle();
          else queue.enableShuffle();
          await interaction.deferUpdate({ fetchReply: true });
          const embed = new EmbedBuilder(interaction.message.embeds[0])
            .setDescription(await playerDescription(queue));

          return await interaction.editReply({
            embeds: [embed]
          });
          break;
        }

        case "seekBack": {
          queue.node.seek(queue.node.streamTime - 5000);
          await interaction.deferUpdate({ fetchReply: true });
          const embed = new EmbedBuilder(interaction.message.embeds[0])
            .setDescription(await playerDescription(queue));

          return await interaction.editReply({
            embeds: [embed]
          });
          break;
        }

        case "stop": {
          queue.node.stop();
          return await interaction.deferUpdate({ fetchReply: true });
          break;
        }

        case "seekNext": {
          queue.node.seek(queue.node.streamTime + 5000);
          await interaction.deferUpdate({ fetchReply: true });
          const embed = new EmbedBuilder(interaction.message.embeds[0])
            .setDescription(await playerDescription(queue));

          return await interaction.editReply({
            embeds: [embed]
          });
          break;
        }

        case "loop": {
          await interaction.deferUpdate({ fetchReply: true });
          if (queue.repeatMode === QueueRepeatMode.QUEUE)
            queue.setRepeatMode(QueueRepeatMode.TRACK);

          else if (queue.repeatMode === QueueRepeatMode.TRACK)
            queue.setRepeatMode(QueueRepeatMode.OFF);

          else queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);

          const embed = new EmbedBuilder(interaction.message.embeds[0])
            .setDescription(await playerDescription(queue));

          return await interaction.editReply({
            embeds: [embed]
          });
          break;
        }
      }
    };

    if (interaction.isStringSelectMenu()) {
      switch (id) {
        case "queue": {
          await interaction.deferUpdate({ fetchReply: true });
          const index = Number(interaction.values[0]);
          queue.node.skipTo(index);
        } break;
      }
    }
  } catch (e) {
    error(e);
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