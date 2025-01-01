const moment = require("moment");
const Discord = require("discord.js");
const os = require("os");
const {
  MessageEmbed
} = require("discord.js");
const {
   MessageButton,
    MessageActionRow 
} = require("discord-buttons");
const cpuStat = require("cpu-stat");
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
  name: "about",
  category: "Info",
  aliases: ["info","bot info"],
  description: i18n.__('about.description'),
    async execute(message, args) { 
    try{ 
   const statuses = {
      "online" : "🟢",
      "idle"   : "🟠",
      "dnd"    : "🔴",
      "offline": "⚫️",
     }
    const activity = message.client.user.presence.activities[0];   
    var userstatus = "Not Having An Activity";
        if(activity){
          if(activity.type === "CUSTOM_STATUS"){
            let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a": ""}:${activity.emoji.name}:${activity.emoji.id}>`: activity.emoji.name : ""}`
            userstatus = `${emoji} \`${activity.state || 'Not Having An Acitivty.'}\``
          }
          else{
            userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
          }
       }
    function epoch(date) {
  return Date.parse(date)
}
  let seconds = Math.floor(message.client.uptime / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  seconds %= 60;
  minutes %= 60;
  hours %= 24;
    var createdAtDate = epoch(message.client.user.createdAt) / 1000;
    var joinedAtDate = epoch(message.guild.members.cache.get(message.client.user.id).joinedAt) / 1000; 
    cpuStat.usagePercent(function (e, percent) {
      if (e) {
          return console.log(String(e.stack).red);
      }
      let connectedchannelsamount = 0;
      let guilds = message.client.guilds.cache.map((guild) => guild);
      for (let i = 0; i < guilds.length; i++) {
          if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
      }
      if (connectedchannelsamount > message.client.guilds.cache.size) connectedchannelsamount = message.client.guilds.cache.size;
let infoEmbed = new MessageEmbed()
      .setColor('#2F3136')
      .setTitle(`Stats from \`${message.client.user.tag}\``)
      .addField(`🆔| ID:`,`<:reply_desgine:950701730675445790>** User Id: ${message.client.user.id}**`,true)
      .addField(`🥋| Tag:`, `<:reply_desgine:950701730675445790>**${message.client.user.tag}**`,true) 
      .addField(":ping_pong:| Ping",`**<:reply_desgine:950701730675445790> User Ping Is: \`${Math.round(message.client.ws.ping)}MS\`**`,true)
      .addField(":clock1:| Uptime", `<:reply_desgine:950701730675445790>** Time Of Bot Online: \`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\`** || \`${moment.duration(message.client.uptime)}\``,true)
      .addField(`✨| Status:`,`<:reply_desgine:950701730675445790>** Bot Status Is: ${statuses[message.client.user.presence.status]} ${message.client.user.presence.status}**`,true)
      .addField('🎬| Activity:',`<:reply_desgine:950701730675445790>** Bot Activity Is: ${userstatus}**`,true)
      .addField(`📅| Date of Join Discord:`,`<:reply_desgine:950701730675445790>** Time Of Bot Created: <t:${createdAtDate}:R>**`,true) 
      .addField(`📈| Date of Join Server:`, `<:reply_desgine:950701730675445790>** Time Of Bot Join Server: <t:${joinedAtDate}:R>**`,true) 
      .addField(":file_cabinet:| Memory Usage",`<:reply_desgine:950701730675445790>** Bot Usage Memory Is: \`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\`\`**`,true)
      .addField(":busts_in_silhouette:| Usage Users",`<:reply_desgine:950701730675445790>** Count Of Usage Users Is: \`${message.client.users.cache.size}\`**`,true)
      .addField(":homes:| Servers",`<:reply_desgine:950701730675445790>** Count Of Bot Servers Is: \`${message.client.guilds.cache.size}\`**`, true)
      .addField("🎙️| Voice Channels", `<:reply_desgine:950701730675445790>** Count Of Bot Voice Channel Is: \`${message.client.channels.cache.filter((ch) => ch.type === "voice").size}\`**`,true)
      .addField("💬| Text Channels", `<:reply_desgine:950701730675445790>** Count Of Bot Text Channel Is: \`${message.client.channels.cache.filter((ch) => ch.type === "text").size}\`**`,true)
      .addField("🎤| Connected Channels", `<:reply_desgine:950701730675445790>** Count Of Bot Joined Voices Is: \`${connectedchannelsamount}\`**`,true)
      .addField(":control_knobs: API Latency",`<:reply_desgine:950701730675445790>** Bot API Latency Is: \`${message.client.ws.ping}MS\`**`,true)
      .addField(":robot: Version",`<:reply_desgine:950701730675445790>** Bot Version Is: \`Omega 5.2.1\`**`,true)
      .addField(":blue_book: Discord.js",`<:reply_desgine:950701730675445790>** Bot Usage Discord.js Version Is: \`Version ${Discord.version}\`**`,true)
      .addField(":green_book: Node.js",`<:reply_desgine:950701730675445790>** Bot Usage Node.js Version Is: \`Version ${process.version}\`**`,true)
      .addField("📡| CPU", `<:reply_desgine:950701730675445790>** Bot Usage CPU Model Is: \`\`\`Model\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\`**`,true)
      .addField("🖥| CPU Usage", `<:reply_desgine:950701730675445790>** Bot Percent Of Usage CPU Is: \`\`\`${percent.toFixed(2)}%\`\`\`**`,true)
      .addField("🧵| Shards", `<:reply_desgine:950701730675445790>** Bot Shards Percent Is: \`${message.client.ws.shards.size}%\`**`,true)
      .addField("👔| Cores", `<:reply_desgine:950701730675445790>** Bot Cores Percent Is: \`${os.cpus().length}%\`**`,true)
      .addField("🧥| Architecture", `<:reply_desgine:950701730675445790>** Bot Architecture Is: \`${os.arch()}\`**`,true)
      .addField("🕹| Platform", `<:reply_desgine:950701730675445790>** Bot Usage Platform Is: \`${os.platform()}\`**`,true)
      .addField("🧰| Commands Count", `<:reply_desgine:950701730675445790>** Bot Commands Count Is: \`${message.client.commands.size}\`**`,true)
      .setTimestamp()
      
            message.channel.send(infoEmbed)
        })
      
      }catch(e) {
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
}	console.log(e)
      return message.channel.send(`⚠**| Error, ${e}**`);
        }
  }
}

