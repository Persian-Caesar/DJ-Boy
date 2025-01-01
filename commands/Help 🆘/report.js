const {MessageEmbed} = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
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
    name: 'report',
    cooldown: 10,
    aliases: ['bug','rp'],
    category: "Help",
    description: i18n.__('report.description'),

async execute(message, args){ 
const choice = args.slice().join(" ");
    try{
        if (!choice){
 return message.channel.send("Please write the text of your report on the command to be checked or visit the bot support server and share it with the creators in a special chat room or in the buggy ticket ticket.",{
      components: [NeedHelpButtons()] 
    })
}else {
      const channelbug = message.client.channels.cache.get(message.client.config.REPORT_CHANNEL_ID);
        let invite = await message.channel.createInvite({
            maxAge: 0, 
            maxUses: 5
        }, )

     const soal = new MessageEmbed()
      .setAuthor(`${message.author.username}`,message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setTitle(`This Guy Have a Report, User ID: "${message.author.id}"`)
      .setColor('#2F3136')
      .addField(`> **User :**`,`<:reply_desgine:950701730675445790>${message.author}`,true)
      .addField(`> **Send :**` ,`<:reply_desgine:950701730675445790>${choice}`,true) 
      .addField(`> **Server :**`, `<:reply_desgine:950701730675445790>${invite.url}`,true)
      .setURL(invite.url)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setFooter(`Requested By ${message.author.tag}`,message.client.user.displayAvatarURL({ dynamic: true }))
    channelbug.send({ embed: soal }).then((msg)=> {
      msg.react(message.client.emotes.report)
     })
        message.reply('Your bug request or comment was sent to the support server, or the admins join the server and solve it, or request a friend. Thanks.',{
             components: [SuppoerButtons()] 
            })
     
    }

function NeedHelpButtons() {
  const btn = new MessageButton()
  .setStyle('url')
  .setLabel('Support Server!')
  .setEmoji('🧰')
  .setURL(`${message.client.config.SUPPORT_SERVER_LINK}`)

  const row = new MessageActionRow()
  .addComponents(btn)

  return row;
}

function SuppoerButtons() {
  const btn1 = new MessageButton()
  .setStyle('url')
  .setLabel('Invite Me')
  .setEmoji('🤖')
  .setURL(message.client.config.INVITE_LINK)

  const btn2 = new MessageButton()
  .setStyle('url')
  .setLabel('Support Server!')
  .setEmoji('🧰')
  .setURL(`${message.client.config.SUPPORT_SERVER_LINK}`)

  const row = new MessageActionRow()
  .addComponents(btn1, btn2)

  return row;
}
       }catch(e) {
	console.log(e)
      return message.channel.send(`⚠**| Error, ${e}**`);
        }
    }
}