const { MessageEmbed } = require("discord.js");
const {
  canModifyQueue,
  YOUTUBE_API_KEY,
  SOUNDCLOUD_CLIENT_ID,
  LOCALE,
  DEFAULT_VOLUME,
  MAX_PLAYLIST_SIZE
} = require("./../../util/AdUtil");
const i18n = require("i18n");
i18n.setLocale(LOCALE);

module.exports = {
  name: "help",
  aliases: ["h"],
  category: "Help",
  description: i18n.__("help.description"),
async execute(message) {
    let commands = message.client.commands.array();
    var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`)|| message.client.prefix;
    let helpEmbed = new MessageEmbed()
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setTitle(i18n.__mf("help.embedTitle", { botname: message.client.user.username }))
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      .setDescription(i18n.__("help.embedDescription"))
      .setColor("#2F3136")

      .setFooter(`To get info of each command you can do ${prefix}help | Create by Mr.SIN RE#1528 :)`);
    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${prefix}${cmd.name}**`,
        `\`Description: ${cmd.description} | Aliases: (${cmd.aliases ? `${cmd.aliases}` : ""})\``,
        true
      );
    });
const { MessageButton } = require('discord-buttons');
 let btn2 = new MessageButton()
    .setStyle('url') 
    .setLabel('🤖Invite Bot') 
  .setURL(message.client.config.INVITE_LINK)
     let btn = new MessageButton()
    .setStyle('url') 
    .setLabel('🦾Server Support') 
  .setURL(`${message.client.config.SUPPORT_SERVER_LINK}`)

    return message.channel.send({ button: [btn,btn2],embed:helpEmbed}).catch(console.error);
  }
};
