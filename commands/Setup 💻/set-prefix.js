const {
  canModifyQueue,
  PREFIX,
  YOUTUBE_API_KEY,
  SOUNDCLOUD_CLIENT_ID,
  LOCALE,
  DEFAULT_VOLUME,
  MAX_PLAYLIST_SIZE
} = require("./../../util/AdUtil");
const i18n = require("i18n");
i18n.setLocale(LOCALE);
const {
  MessageEmbed
} = require('discord.js')
module.exports = {
    name: "setprefix",
    cooldown: 5,
    category: "Setup",
    aliases: ["set-prefix","stp"],
    description: i18n.__('setprefix.description'),
  
  async execute(message, args) { 
        try {
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                let pererrorEmbed = new MessageEmbed()
                              .setColor("0xFF0000")
                               .setTitel(`**❌ | Error**`)
                               .setDescription(`For use this command you need "ADMINISTRATOR" permission.`)
                message.channel.send(pererrorEmbed)
            }
          const newPrefix = args.join(" ")
            if (newPrefix.length > 7) { 
                  let errorEmbed = new MessageEmbed()
                              .setColor("#2F3136")
                               .setTitel(`**❌ | Error**`)
                               .setDescription(`My friend this prefix is to long please set it to \`7\` length😶‍🌫️`)
                    message.channel.send(errorEmbed)
                }
            if (newPrefix) {
        require('quick.db').set(`prefix_${message.guild.id}`, newPrefix);
                  let prefixEmbed = new MessageEmbed()
                           .setThumbnail(message.client.user.displayAvatarURL())
                              .setColor("#2F3136")
                               .setDescription(`Bot Prefix In Server Changed To: **${newPrefix}**`)
                               .setTimestamp(Date.now())
                             .setAuthor(`prefix of ${message.client.user.tag} changed👌🏻`,message.client.user.displayAvatarURL())
                               .setFooter(`prefix changed by ${message.author.tag} |`,message.author.displayAvatarURL())
              message.channel.send(prefixEmbed)
            } else if(!newPrefix){
                              require('quick.db').set(`prefix_${message.guild.id}`, PREFIX);
                   let errorprefixEmbed = new MessageEmbed()
                              .setColor("#2F3136")
                          .setThumbnail(message.client.user.displayAvatarURL())
                               .setTimestamp(Date.now())
                               .setAuthor(`prefix of ${message.client.user.tag} changed👌🏻`,message.user.displayAvatarURL())
                               .setFooter(`prefix changed by ${message.author.tag} |`,message.author.displayAvatarURL())
                               .setDescription(`Bot Prefix Changed To Default: **${PREFIX}**`)
                message.channel.send(errorprefixEmbed)
            }
        } catch (err) {
            return;
        }
    }
}
  