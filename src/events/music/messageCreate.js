const {
    ChannelType,
    ButtonStyle,
    ComponentType,
    MessageFlags
} = require("discord.js");
const timeoutDelete = require("../../functions/timeoutDelete");
const database = require("../../functions/database");
const error = require("../../functions/error");
const { MusicPlayer } = require("@persian-caesar/discord-player");
const { ActionRowBuilder } = require("discord.js");
const { ButtonBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

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
        
        let collector;
        const db = new database(client.db);
        const panel = await db.get(`musicPanel.${message.guild.id}`);
        const players = client.players;
        if (panel && message.channel.id === panel.channel) {
            let query = message.content;
            const channel = message.member?.voice?.channel;
            const msg = await message.reply("🔍 Searching...");
            let player = players.get(message.guild.id);
            if (!player) {
                player = new MusicPlayer(message.member.voice.channel);
                players.set(message.guildId, player);
            }

            if (!query) return await message.reply("You have to write a music name or place a url.").then(async msg => timeoutDelete(message, msg));

            if (!channel) return await message.reply("You have to join a voice channel first.").then(async msg => timeoutDelete(message, msg));

            if (player && player.channel?.id !== channel.id)
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

            timeoutDelete(message, msg);
            if (!player.isPlaying()) {
                player.removeAllListeners();

                player
                    .on("start", async ({ metadata, queue }) => {
                        const embed = new EmbedBuilder()
                            .setTitle(`${metadata.title}`)
                            .setURL(`${metadata.url}`)
                            .setDescription(await playerDescription(queue))
                            .setFields([
                                {
                                    name: `Music From:`,
                                    value: `**${metadata.author}**`
                                },
                                {
                                    name: `Duration:`,
                                    value: `**${metadata.duration}**`
                                }
                            ])
                            .setColor(message.guild.members.me.displayHexColor)
                            .setTimestamp();

                        if (metadata.thumbnail) embed.setThumbnail(metadata.thumbnail);

                        await db.init();
                        const panel = await db.get(`musicPanel.${queue.guild.id}`);
                        if (panel && queue.metadata.channel.id === panel.channel) {
                            const message = await queue.metadata.channel.messages.fetch(panel.message);
                            const components = await playerMenuComponents(queue);
                            for (const actionRow of await playerButtonComponents()) {
                                components.push(actionRow)
                            };
                            const playMessage = await message.edit({
                                embeds: [embed],
                                components: components
                            }).catch(error);

                            // Define button controls
                            const controls = new Map([
                                ['previous', async () => player.previous()],
                                ['skip', async () => player.skip()],
                                ['shuffle', async () => player.isShuffiled() ? player.undoShuffle() : player.shuffle()],
                                ['loopQueue', async () => player.toggleLoopQueue()],
                                ['loopTrack', async () => player.toggleLoopTrack()],
                                ['pauseResume', async () => player.isPaused() ? player.resume() : player.pause()],
                                ['volumeDown', async () => player.setVolume(player.getVolume() - 10)],
                                ['volumeUp', async () => player.setVolume(player.getVolume() + 10)],
                                ['stop', async () => { player.stop(); collector?.stop(); }],
                                ['disconnect', async () => { player.stop(false); collector?.stop(); }]
                                ['lyrics', async (interaction) => { player.stop(false); collector?.stop(); }]
                            ]);

                            // Create action rows with buttons
                            const row1 = new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setCustomId('previous')
                                    .setEmoji('⏮️')
                                    .setStyle(ButtonStyle.Primary)
                                    .setLabel('Previous'),

                                new ButtonBuilder()
                                    .setCustomId('skip')
                                    .setEmoji('⏭️')
                                    .setStyle(ButtonStyle.Primary)
                                    .setLabel('Skip'),

                                new ButtonBuilder()
                                    .setCustomId('pauseResume')
                                    .setEmoji('⏯️')
                                    .setStyle(ButtonStyle.Primary)
                                    .setLabel('Play/Pause'),

                                new ButtonBuilder()
                                    .setCustomId('stop')
                                    .setEmoji('⏹️')
                                    .setStyle(ButtonStyle.Danger)
                                    .setLabel('Stop'),

                                new ButtonBuilder()
                                    .setCustomId('disconnect')
                                    .setEmoji('❌')
                                    .setStyle(ButtonStyle.Danger)
                                    .setLabel('Disconnect')
                            );

                            const row2 = new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setCustomId('shuffle')
                                    .setEmoji('🔀')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel('Shuffle'),

                                new ButtonBuilder()
                                    .setCustomId('loopQueue')
                                    .setEmoji('🔁')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel('Loop Queue'),

                                new ButtonBuilder()
                                    .setCustomId('loopTrack')
                                    .setEmoji('🔂')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel('Loop Track'),

                                new ButtonBuilder()
                                    .setCustomId('volumeDown')
                                    .setEmoji('🔉')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel('Vol-'),

                                new ButtonBuilder()
                                    .setCustomId('volumeUp')
                                    .setEmoji('🔊')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel('Vol+')
                            );

                            const row3 = new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setCustomId('lyrics')
                                    .setEmoji('📃')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel('Lyric')
                            );

                            await playMessage.edit({
                                components: [row1, row2, row3]
                            });

                            // Create component collector
                            collector = playMessage.createMessageComponentCollector({
                                componentType: ComponentType.Button,
                                filter: i => i.user.id === message.author.id,
                                time: 5 * 60_000
                            });

                            collector.on('collect', async interaction => {
                                try {
                                    const action = controls.get(interaction.customId);
                                    if (action) {
                                        await interaction.deferUpdate();
                                        await action(interaction);

                                        return;
                                    }

                                    return;
                                } catch {
                                    await interaction.reply({ content: '⚠️ An error occurred!', flags: MessageFlags.Ephemeral });
                                }
                            });

                            collector.on('end', async () => {
                                try {
                                    await playMessage.edit({
                                        components: [
                                            new ActionRowBuilder().addComponents(
                                                row1.components.map(b =>
                                                    ButtonBuilder.from(b.data)
                                                        .setDisabled(true)
                                                )
                                            ),
                                            new ActionRowBuilder().addComponents(
                                                row2.components.map(b =>
                                                    ButtonBuilder.from(b.data)
                                                        .setDisabled(true)
                                                )
                                            ),
                                            new ActionRowBuilder().addComponents(
                                                row3.components.map(b =>
                                                    ButtonBuilder.from(b.data)
                                                        .setDisabled(true)
                                                )
                                            )
                                        ]
                                    });
                                } catch (error) {
                                    console.error('Error disabling buttons:', error);
                                }
                                players.delete(message.guildId);
                            });
                        }
                    })
                    .on("finish", async () => await message.channel.send("🏁 Playback finished and queue is empty").then(async msg => timeoutDelete(message, msg)))
                    .once("disconnect", async () => {
                        await message.channel.send("👋 Disconnecting...").then(async msg => timeoutDelete(message, msg));
                        collector?.stop();
                    })
                    .on("error", async (e) => await message.channel.send(e.message.includes("No track") ? "❌ No previous track" : `⚠️ Error: ${e.message}`).then(async msg => timeoutDelete(message, msg)))
            }

            else {
                player.once("queueAdd", async ({ metadata, queue }) =>
                    await msg.edit(`📥 Added to queue: ${metadata.url} (Queue length: ${queue.length})`)
                );
            }

            await player.play(query);

            return;
        } else return;
    } catch (e) {
        error(e);
    }
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */