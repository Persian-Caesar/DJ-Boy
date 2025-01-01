const { MessageEmbed } = require('discord.js')
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
  name: "ping",
  cooldown: 10,
  category: "Info",
  description: i18n.__("ping.description"),
  execute(message, args) {

            var states = "🟢 Excellent";
            var states2 = "🟢 Excellent";
            var msg = `${Date.now() - message.createdTimestamp}`;
            var api = `${Math.round(message.client.ws.ping)}`;
            if (Number(msg) > 70) states = "🟢 Good";
            if (Number(msg) > 170) states = "🟡 Not Bad";
            if (Number(msg) > 350) states = "🔴 Soo Bad";
            if (Number(api) > 70) states2 = "🟢 Good";
            if (Number(api) > 170) states2 = "🟡 Not Bad";
            if (Number(api) > 350) states2 = "🔴 Soo Bad";
            if (message.author.bot) return;
            message.channel.send(
                new MessageEmbed()
                .setColor("#2F3136")
                .setAuthor(message.client.user.username, message.client.user.avatarURL({dynamic:true}))
                .addField("**Time Taken:**", msg + " ms 📶 | " + states, true)
                .addField("**WebSocket:**", api + " ms 📶 | " + states2, true)
                .setTimestamp()
                .setFooter(`Request By ${message.author.tag}`,message.author.avatarURL({dynamic:true}))
            );
    
  }
};
