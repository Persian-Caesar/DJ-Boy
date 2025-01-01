const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  Client
} = require("discord.js");
module.exports = {
  name: "volume",
  description: "Shows voice volume and set the volume.",
  category: "Music",
  aliases: ["vol", "setvolume"],
  usage: "[number]",
  type: ApplicationCommandType.ChatInput,
  cooldown: 7,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks", "Speek", "Connect"],
  dm_permission: false,
  only_slash: true,
  only_message: true,
  options: [{
    name: "input",
    description: "Put the number of voice volume you want set.",
    type: ApplicationCommandOptionType.String,
    required: false
  }, {
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
   * @param {import("discord.js").CommandInteraction} interaction 
   * @param {string} args 
   * @param {string} lang 
   * @param {string} prefix 
   * @returns 
   */
  run: async (client, interaction, args, lang, prefix) => {
    let db = client.db;
    let mes = client.languages[lang].commands.volume;
    let voiceChannel = interaction.member.voice?.channel;
    if (!voiceChannel) return interaction.user ? await interaction.followUp(mes.joinVoice) : await interaction.reply(mes.joinVoice);
    if (!interaction.guild.player?.resource) return interaction.user ? await interaction.followUp(mes.noPlayer) : await interaction.reply(mes.noPlayer);
    let volume = args.join(" ");
    let showVolume = mes.showVolume.replace("{volume}", Math.floor(interaction.guild.player.resource.volume.volume * 100));
    if (!volume) return interaction.user ? await interaction.followUp(showVolume) : await interaction.reply(showVolume);
    if (Number(volume) <= 100 && Number(volume) >= 0) {
      await interaction.guild.player.resource.volume.setVolume(volume / 100);
      let msg = mes.showVolume.replace("{volume}", Math.floor(volume));
      return interaction.user ? await interaction.followUp(msg) : await interaction.reply(msg);
    } else {
      return interaction.user ? await interaction.followUp(mes.invalidVolume) : await interaction.reply(mes.invalidVolume);
    };
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