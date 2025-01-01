const {
    ChannelType
} = require("discord.js");
const error = require("../../functions/error");
const { useQueue, useMainPlayer, QueueRepeatMode } = require("discord-player");
const timeoutDelete = require("../../functions/timeoutDelete");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @returns {void}
 */
module.exports = async (client, message) => {
    try {
        // Filter dm channels, webhooks, the bots
        if (message.channel.type === ChannelType.DM || !message || message?.webhookId || message.author?.bot) return;

        const db = client.db;
        await db.init();
        const panel = await db.get(`musicPanel.${message.guild.id}`);
        if (panel && message.channel.id === panel.channel) {
            let query = message.content;
            const channel = message.member?.voice?.channel;
            const player = useMainPlayer();
            const queue = useQueue(message.guild.id);
            if (!query) return await message.reply("You have to write a music name or place a url.").then(async msg => timeoutDelete(message, msg));

            if (!channel) return await message.reply("You have to join a voice channel first.").then(async msg => timeoutDelete(message, msg));

            if (queue && queue.channel?.id !== channel.id)
                return await message.reply(`I'm already playing in a different voice channel! Please join to <#${queue.channel.id}>`).then(async msg => timeoutDelete(message, msg));

            if (!channel.viewable)
                return await message.reply("I need `View Channel` permission.").then(async msg => timeoutDelete(message, msg));

            if (!channel.joinable)
                return await message.reply("I need `Connect Channel` permission.").then(async msg => timeoutDelete(message, msg));

            if (channel.full)
                return await message.reply("Can't join, the voice channel is full.").then(async msg => timeoutDelete(message, msg));

            if (message.member.voice.deaf)
                return await message.reply("You cannot run this command while deafened.").then(async msg => timeoutDelete(message, msg));

            if (message.guild.members.me?.voice?.mute)
                return await message.reply("Please unmute me before playing.").then(async msg => timeoutDelete(message, msg));

            if (query.startsWith("https://on.soundcloud.com")) {
                const results = await fetch(query.split(" ")[0]);
                query = results.url;
            }

            const searchResult = await player
                .search(query, { requestedBy: message.author })
                .catch(error);

            if (!searchResult.hasTracks())
                return await message.reply(`**No track was found for:** ${query}!`).then(async msg => timeoutDelete(message, msg));

            timeoutDelete(message);
            return await player.play(channel, searchResult, {
                nodeOptions: {
                    metadata: {
                        channel: message.channel,
                        author: message.author
                    },
                    repeatMode: QueueRepeatMode.AUTOPLAY,
                    noEmitInsert: true,
                    leaveOnStop: false,
                    leaveOnEmpty: true,
                    leaveOnEmptyCooldown: 5 * 60 * 1000,
                    leaveOnEnd: true,
                    leaveOnEndCooldown: 5 * 60 * 1000,
                    pauseOnEmpty: true,
                    preferBridgedMetadata: true,
                    disableBiquad: true
                }
            });
            // const { track } = await player.play(channel, searchResult, {
            //     nodeOptions: {
            //         metadata: {
            //             channel: message.channel,
            //             author: message.author
            //         },
            //         repeatMode: QueueRepeatMode.AUTOPLAY,
            //         noEmitInsert: true,
            //         leaveOnStop: false,
            //         leaveOnEmpty: true,
            //         leaveOnEmptyCooldown: 5 * 60 * 1000,
            //         leaveOnEnd: true,
            //         leaveOnEndCooldown: 5 * 60 * 1000,
            //         pauseOnEmpty: true,
            //         preferBridgedMetadata: true,
            //         disableBiquad: true
            //     }
            // });
            // return await message.reply({ content: `This object founded **${track.title}** from **${track.author}**!` }).then(async msg => timeoutDelete(message, msg));
        } else return;
    } catch (e) {
        error(e);
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