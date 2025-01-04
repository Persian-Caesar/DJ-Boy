const
    {
        EmbedBuilder,
        ButtonBuilder,
        ActionRowBuilder,
        ButtonStyle
    } = require("discord.js"),
    error = require("../../functions/error"),
    config = require("../../../config"),
    data = require("../../storage/embed"),
    statusEmbedBuilder = require("../../functions/statusEmbedBuilder"),
    database = require("../../functions/database"),
    replaceValues = require("../../functions/replaceValues");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns {void}
 */
module.exports = async (client) => {
    try {
        const
            db = new database(client.db),
            guild = client.guilds.cache.get(config.discord.support.id),
            channel = client.channels.cache.get(config.discord.support.stats_channel),
            databaseName = `status.${channel?.guild?.id}`;

        if (guild && channel) {
            setInterval(async () => {
                const status_message = await db.get(`${databaseName}`);
                let msg;
                try {
                    msg = await channel.messages.fetch(status_message).then((m) => m);
                } catch { };
                const embed = EmbedBuilder.from(await statusEmbedBuilder(client));
                const row = [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Secondary)
                                .setLabel("Refresh")
                                .setEmoji(data.emotes.default.update)
                                .setCustomId("refreshStatus")
                        ),

                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Link)
                                .setLabel("Invite me")
                                .setEmoji(data.emotes.default.invite)
                                .setURL(replaceValues(config.discord.default_invite, { clientId: client.user.id })),

                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Link)
                                .setLabel("Vote for me")
                                .setEmoji(data.emotes.default.topgg)
                                .setURL(`https://top.gg/bot/${client.user.id}/vote`)
                        )
                ];

                if (status_message && msg)
                    return await msg.edit({
                        embeds: [embed]
                    });

                else
                    return await channel.send({
                        embeds: [embed],
                        components: row
                    }).then(async (msg) => {
                        await db.set(`${databaseName}`, msg.id)
                    });
            }, 1000 * 60 * 60); // Every 1 hours
        };

    } catch (e) {
        error(e)
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