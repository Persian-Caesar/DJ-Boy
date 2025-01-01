const {
    PermissionsBitField,
    EmbedBuilder,
    Collection
} = require("discord.js");
const error = require("../../functions/error");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @returns 
 */
module.exports = async (client, message) => {
    try {
        const db = client.db;
        if (message.author.bot || message.webhookId) return;

        // Command Prefix & args
        const Tprefix = `${client.config.prefix}`;
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
        if (command) {

            // Check Perms
            if (command.only_owner) {
                if (!client.config.owners.includes(message.author.id)) return;
            };

            const mentionCommand = `\`${prefix + command.name}\``;
            if (message.guild) {
                const bot_perms = [];
                const user_perms = [];
                command.bot_permissions.forEach(perm => bot_perms.push(PermissionsBitField.Flags[perm]));
                command.user_permissions.forEach(perm => user_perms.push(PermissionsBitField.Flags[perm]));
                if (!message.guild.members.me.permissions.has([bot_perms] || [])) return await message.reply({ embeds: [new EmbedBuilder().setDescription(`❌| I don't have permission to respond ${mentionCommand} command!! \nPermissions need: [${command.bot_permissions.map(p => `\`${p}\``).join(" , ")}]`).setColor("Orange")] }).catch((e) => { console.log(e) });

                if (!message.member.permissions.has([user_perms] || [])) return await message.reply({ embeds: [new EmbedBuilder().setDescription(`⚠| You don't have  permission to use ${mentionCommand} command!! \nPermissions need: [${command.user_permissions.map(p => `\`${p}\``).join(" , ")}]`).setColor("Red")] }).catch((e) => { console.log(e) });
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
                    return message.reply({ content: `Please wait, you are on a cooldown for ${mentionCommand}. You can use it again <t:${expiredTimestamp}:R>.` });
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
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */