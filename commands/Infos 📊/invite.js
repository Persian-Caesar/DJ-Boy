const {
  canModifyQueue,
  YOUTUBE_API_KEY,
  SOUNDCLOUD_CLIENT_ID,
  LOCALE,
  DEFAULT_VOLUME,
  MAX_PLAYLIST_SIZE
} = require("./../../util/AdUtil");
const i18n = require("i18n");
const { MessageEmbed } = require("discord.js");
i18n.setLocale(LOCALE);

module.exports = {
  name: "invite",
  category: "Info",
  aliases: ['in'],
  description: i18n.__('invite.description'),  
  execute(message, args) {
    const { MessageButton } = require('discord-buttons');
  let inviteEmbed = new MessageEmbed()
      inviteEmbed.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      inviteEmbed.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      inviteEmbed.setTitle(`By Inviting Bot In Your Guild Support It ${message.client.user.username}`)
      inviteEmbed.setDescription(`**What's are you waiting for?🤨\nGive me a join to your server🙂😘\n\n [Invite Link](${message.client.config.INVITE_LINK})**`)
      inviteEmbed.setURL(message.client.config.SUPPORT_SERVER_LINK)
      inviteEmbed.setFooter("Created By Mr.SIN RE#1528 :)", `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`)
      inviteEmbed.setColor("#2F3136")

 let btn2 = new MessageButton()
    .setStyle('url') 
    .setLabel('🤖Invite Bot') 
  .setURL(message.client.config.INVITE_LINK)

  const btn = new MessageButton()
  .setStyle('url')
  .setLabel('Support Server!')
  .setEmoji('🧰')
  .setURL(`${message.client.config.SUPPORT_SERVER_LINK}`)

    message.channel.send( { button: [btn,btn2],embed: inviteEmbed });
    }
}
