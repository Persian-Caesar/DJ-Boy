const {
  EmbedBuilder,
  PermissionsBitField,
  ApplicationCommandOptionType,
  Collection
} = require("discord.js");
const error = require("../../functions/error");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").CommandInteraction} interaction 
 * @returns 
 */
module.exports = async (client, interaction) => {
  try {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (command) {
        const args = [];
        for (let option of interaction.options.data) {
          if (option.type === ApplicationCommandOptionType.Subcommand) {
            if (option.name) args.push(option.name);

            option.options?.forEach((x) => {
              if (x.value) args.push(x.value);
            })
          } else if (option.value) args.push(option.value);
        };

        if (command.only_owner) {
          if (!client.config.owners.includes(interaction.user.id)) return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`❌| You don't have access to use this command.`).setColor("Orange")], ephemeral: true }).catch((e) => { console.log(e) })
        };

        const fcmd = client.application.commands.cache.find(c => c.name === command.name);
        const mentionCommand = `</${fcmd.name}${interaction.options.data.some(a => a.type === ApplicationCommandOptionType.Subcommand) ? ` ${interaction.options.data.find(a => a.type === ApplicationCommandOptionType.Subcommand).name}` : ""}:${fcmd.id}>`;
        if (interaction.guild) {
          const bot_perms = [];
          const user_perms = [];
          command.bot_permissions.forEach(perm => bot_perms.push(PermissionsBitField.Flags[perm]));
          command.user_permissions.forEach(perm => user_perms.push(PermissionsBitField.Flags[perm]));
          if (!interaction.guild.members.me.permissions.has([bot_perms] || [])) return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`❌| I don't have permission to respond ${mentionCommand} command!! \nPermissions need: [${command.bot_permissions.map(p => `\`${p}\``).join(" , ")}]`).setColor("Orange")], ephemeral: true }).catch((e) => { console.log(e) });

          if (!interaction.member.permissions.has([user_perms] || [])) return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`⚠| You don't have  permission to use ${mentionCommand} command!! \nPermissions need: [${command.user_permissions.map(p => `\`${p}\``).join(" , ")}]`).setColor("Red")], ephemeral: true }).catch((e) => { console.log(e) });
        };

        // Cooldown
        if (!client.cooldowns.has(command.name)) {
          client.cooldowns.set(command.name, new Collection());
        };

        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
        if (timestamps.has(interaction.user.id)) {
          const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
          if (now < expirationTime) {
            const expiredTimestamp = Math.round(expirationTime / 1000);
            return interaction.reply({ content: `Please wait, you are on a cooldown for ${mentionCommand}. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
          }
        };

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        // Command Handler 
        await interaction.deferReply({ ephemeral: interaction.options.getString("ephemeral") === "true" ? true : false });
        command.run(client, interaction, args);
      } else {
        return;
      }
    }
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