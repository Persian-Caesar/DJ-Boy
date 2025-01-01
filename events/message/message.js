const db = require("quick.db");
const Discord = require("discord.js");
const clc = require("cli-color");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const {
  PREFIX,
  LOCALE,
} = require("./../../util/AdUtil");
const i18n = require("i18n");
i18n.setLocale(LOCALE);
module.exports = async (client, message) => {
      if(message.channel.type === 'dm'){
        if(message.author.bot) return;
        if(message.content.includes('@'))return message.channel.send("⛔| **you can't mention someone.**")
      const channelbug = client.channels.cache.get(client.config.REPORT_CHANNEL_ID);
        const embed = new Discord.MessageEmbed()
          .setColor("#2F3136")
          .setAuthor(`${message.author.username}`,message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setTitle(`This Guy Have Report, User ID "${message.author.id}"`)
          .setDescription(`> ${message.content}`)
        channelbug.send(embed).then((msg)=> {
          msg.react("📞")
         }).then((m)=>{
             message.reply({
              content: ` \`\`\`js\n ✅| Successfuly your report or bug📞 message send to My Developers ❤️ \`\`\`**thank's for sending your message to us.\nFor helping you my develpoers or admins send a \`Friend-Request\` for you or just join to server and fix your problem. :)**`,
              components: [NeedHelpButtons()] 
             })
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
    if (message.author.bot || message.channel.type === 'dm') return;

//======== Command for shows the prefix ========
      if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>` || message.content === `${client.prefix}prefix`) {
      var prf = await db.fetch(`prefix_${message.guild.id}`)||client.prefix;
      let errorprefixEmbed = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setAuthor(`prefix of ${client.user.tag} shows👌🏻`, client.user.displayAvatarURL())
            .setFooter(`prefix shows to ${message.author.tag} |`,message.author.displayAvatarURL({ dynamic: true }))
            errorprefixEmbed.setDescription(`My prefix in server is: **${prf}**`)
     message.reply(errorprefixEmbed)
  }

//======== Command Prefix & args ========
   if (message.author.bot) return;
  if (!message.guild) return;
    const prefix = await db.fetch(`prefix_${message.guild.id}`)||client.prefix;
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [ matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
if(commandName.length > 0){
  if (!command) return message.reply(
        i18n.__mf("common.unknowCommand", { alert: "⛔️", name: commandName })
      );
}
  
//======== Command Cooldown ========
  if (!client.cooldowns.has(command.name)) {
    client.cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 5) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        i18n.__mf("common.cooldownMessage", { alert: "⏰", time: timeLeft.toFixed(1), name: command.name })
      );
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

//======== Command Handler ========
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    //message.reply(i18n.__("common.errorCommend", {  alert: "⚠️" })).catch(console.error);
  }
  
//========== Leave Guild =========
  if(message.guild.memberCount < 90&&!message.guild.id==="991109798709956668"&&!message.guild.id === "901877002926174279"){
  var guildOwner = message.guild.members.get(message.guild.owner.id);
  guildOwner.send("Hi I left on your server because the number of members of your server is less than 100")
  message.guild.leave()
}
};
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */