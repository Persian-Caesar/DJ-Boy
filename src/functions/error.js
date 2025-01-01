const { EmbedBuilder, WebhookClient } = require("discord.js");
const post = require("./post");
const config = require("../../config");
const copyRight = require("../storage/copyRight.json");

/**
 * 
 * @param {Error} error 
 * @returns {void}
 */
module.exports = function (error) {
    try {
        if (config.source.logger && config.discord.support.webhook.url) {
            const webhook = new WebhookClient({ url: config.discord.webhook.url });
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${error.message}` })
                .setFooter({ text: copyRight.footerText, iconURL: copyRight.footerIcon })
                .setTitle(`⚠️| An error occurred`)
                .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
                .setColor("Red")
                .addFields([{ name: `📛| Name:`, value: `${error.name}` }]);

            if (error.code) embed.addFields([{ name: `🚫| Code:`, value: `${error.code}` }]);

            if (error.status) embed.addFields([{ name: `🌐| httpStatus:`, value: `${error.status}` }]);

            embed.addFields([{ name: `🕰| Timestamp:`, value: `**<t:${Date.parse(new Date()) / 1000}:D> | <t:${Date.parse(new Date()) / 1000}:R>**` }]);
            let data = {
                embeds: [embed]
            };
            if (config.discord.webhook.avatar) data.avatar = config.discord.webhook.avatar;
            if (config.discord.webhook.username) data.username = config.discord.webhook.username;

            return webhook.send(data);
        } else {
            console.log(error);
        };
    } catch (e) {
        post("Error logger to discord webhook have bug!!", "E", "red", "redBright");
        console.log(e);
        post("Main Error:", "E", "red", "redBright");
        console.log(error);
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