const { EmbedBuilder, WebhookClient } = require("discord.js");
const post = require("./post");
const config = require("../config");
const colors = require("../storage/colors.json");

/**
 * 
 * @param {Error} error 
 * @returns
 */
module.exports = function (error) {
    try {
        const webhook = new WebhookClient({ url: config.webhook.url });
        const embed = new EmbedBuilder()
            .setAuthor({ name: `${error.message}` })
            .setTitle(`⚠️| An error occurred`)
            .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
            .setColor(colors.theme)
            .addFields([{ name: `📛| Name:`, value: `${error.name}` }]);

        if (error.code) embed.addFields([{ name: `🚫| Code:`, value: `${error.code}` }]);

        if (error.status) embed.addFields([{ name: `🌐| httpStatus:`, value: `${error.status}` }]);

        embed.addFields([{ name: `🕰| Timestamp:`, value: `**<t:${Date.parse(new Date()) / 1000}:D> | <t:${Date.parse(new Date()) / 1000}:R>**` }]);

        return webhook.send({
            embeds: [embed],
            username: config.webhook.username,
            avatarURL: config.webhook.avatar
        });
    } catch (e) {
        post("Error logger to discord webhook have bug!!", "E", "red", "redBright");
        console.error(e);
        console.error(error);
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