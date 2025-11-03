const {
    ChannelType,
    PermissionsBitField,
    EmbedBuilder,
    Collection,
    ThreadAutoArchiveDuration
} = require("discord.js");
const error = require("../../functions/error");
const config = require("../../../config");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @returns {void}
 */
module.exports = async (client, message) => {
    try {
        // Filter dm channels
        if (message.channel.type === ChannelType.DM) return;

        // Filter webhooks
        if (!message || message?.webhookId) return;

        // Filter the bots
        if (message.author?.bot) return;

        // Command Prefix & args
        const Tprefix = `${config.discord.prefix}`;
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(Tprefix.toString())})\\s*`);
        if (!prefixRegex.test(message.content)) return;

        const [prefix] = message.content.match(prefixRegex);
        if (message.content.indexOf(prefix) !== 0) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        if (!commandName) return;

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        // Command Handler
        if (command && command.only_message) {
            const mentionCommand = `\`${prefix + command.name}\``;
            if (message.guild) {
                const bot_perms = [];
                const user_perms = [];
                command.bot_permissions.forEach(perm => bot_perms.push(PermissionsBitField.Flags[perm]));
                command.user_permissions.forEach(perm => user_perms.push(PermissionsBitField.Flags[perm]));
                if (!message.guild.members.me.permissions.has([bot_perms] || [])) return await message.reply({ embeds: [new EmbedBuilder().setDescription(`ربات که من باشم دسترسی لازم برای ران کردن کامند ${mentionCommand} رو ندارم!!\nدسترسی های لازم: [${command.bot_perms.map(p => `\`${p}\``).join(", ")}]`).setColor("Orange")] }).catch((e) => { error(e) });

                if (!message.member.permissions.has([user_perms] || [])) return await message.reply({ embeds: [new EmbedBuilder().setDescription(`ببین پسر خوب تو دسترسی های لازم برای استفاده از کامند ${mentionCommand} رو نداری!! \nدسترسی های لازم: [${command.user_perms.map(p => `\`${p}\``).join(", ")}]`).setColor("Red")] }).catch((e) => { error(e) });
            };

            // Cooldown
            if (!client.cooldowns.has(command.name)) {
                client.cooldowns.set(command.name, new Collection());
            };

            const now = Date.now();
            const timestamps = client.cooldowns.get(command.name);
            const defaultCooldownDuration = 3;
            const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                if (now < expirationTime) {
                    const expiredTimestamp = Math.round(expirationTime / 1000);
                    return message.reply({ content: `شما به دلیل اسپم از کامند ${mentionCommand} محروم شدید و تا <t:${expiredTimestamp}:R> دیگر میتوانید دوباره از آن استفاده کنید.` });
                }
            };

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

            // Command Handler
            message.channel.sendTyping();
            setTimeout(() => {
                command.run(client, message, args);
            }, 100);
        };
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