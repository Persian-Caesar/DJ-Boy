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
  name: "serverlist",
  aliases: ["sl"],
  category: "Owner",
  description: i18n.__('serverlist.description'),
async  execute(message) {
const Discord = require("discord.js");
    if (!message.client.config.owner.some(r => r.includes(message.author.id)))
        return message.channel.send(new Discord.MessageEmbed()
          .setColor('RED')
          .setFooter()
          .setTitle(`> You are not allowed to run this Command`)
          .setDescription(`You need to be one of those guys: ${message.client.config.owner.map(id => `<@${id}>`)}`)
        );

        let i0 = 0;
        let i1 = 10;
        let page = 1;
  
        let description =
          `Total Servers - ${message.client.guilds.cache.size}\n\n` +
          message.client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
            .slice(0, 10)
            .join("\n");
  
        let embed = new Discord.MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setColor('#2F3136')
          .setFooter(message.client.user.username)
          .setTitle(`Page - ${page}/${Math.ceil(message.client.guilds.cache.size / 10)}`)
          .setDescription(description);
  
        let msg = await message.channel.send(embed);
  
        await msg.react("⬅");
        await msg.react("➡");
        await msg.react("❌");
  
        let collector = msg.createReactionCollector(
          (reaction, user) => user.id === message.author.id
        );
  
        collector.on("collect", async (reaction, user) => {
          if (reaction.emoji.name === "⬅") {
            // Updates variables
            i0 = i0 - 10;
            i1 = i1 - 10;
            page = page - 1;
  
            // if there is no guild to display, delete the message
            if (i0 + 1 < 0) {
              console.log(i0)
              return msg.delete();
            }
            if (!i0 || !i1) {
              return msg.delete();
            }
  
            description =
              `Total Servers - ${message.client.guilds.cache.size}\n\n` +
              message.client.guilds.cache
                .sort((a, b) => b.memberCount - a.memberCount)
                .map(r => r)
                .map(
                  (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`
                )
                .slice(i0, i1)
                .join("\n");
  
            // Update the embed with new informations
            embed
              .setTitle(
                `Page - ${page}/${Math.round(message.client.guilds.cache.size / 10 + 1)}`
              )
              .setDescription(description);
  
            // Edit the message
            msg.edit(embed);
          }
  
          if (reaction.emoji.name === "➡") {
            // Updates variables
            i0 = i0 + 10;
            i1 = i1 + 10;
            page = page + 1;
  
            // if there is no guild to display, delete the message
            if (i1 > message.client.guilds.cache.size + 10) {
              return msg.delete();
            }
            if (!i0 || !i1) {
              return msg.delete();
            }
  
            description =
              `Total Servers - ${message.client.guilds.cache.size}\n\n` +
              message.client.guilds.cache
                .sort((a, b) => b.memberCount - a.memberCount)
                .map(r => r)
                .map(
                  (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`
                )
                .slice(i0, i1)
                .join("\n");
  
            // Update the embed with new informations
            embed
              .setTitle(
                `Page - ${page}/${Math.round(message.client.guilds.cache.size / 10 + 1)}`
              )
              .setDescription(description);
  
            // Edit the message
            msg.edit(embed);
          }
  
          if (reaction.emoji.name === "❌") {
            return msg.delete();
          }
  
          // Remove the reaction when the user react to the message
          await reaction.users.remove(message.author.id);
        });
      
  }
}
