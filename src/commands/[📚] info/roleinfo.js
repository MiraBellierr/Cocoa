const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'roleinfo',
	description: 'display role information',
	category: '[📚] info',
	options: [{
		name: 'role',
		description: 'choose a role',
		type: 8,
		required: true,
	}],
	run: async (client, interaction) => {
		const role = interaction.options.getRole('role');

		const guildMembers = await role.guild.members.fetch();
		const memberCount = guildMembers.filter(member => member.roles.cache.has(role.id)).size;

		let permission;

		if (role.permissions.has('ADMINISTRATOR')) {
			permission = 'Administrator';
		}
		else if (!role.permissions.has('ADMINISTRATOR') && (role.permissions.has('KICK_MEMBERS') || role.permissions.has('BAN_MEMBERS') || role.permissions.has('MANAGE_CHANNELS') || role.permissions.has('MANAGE_GUILD') || role.permissions.has('MANAGE_MESSAGES') || role.permissions.has('MENTION_EVERYONE') || role.permissions.has('MUTE_MEMBERS') || role.permissions.has('DEAFEN_MEMBERS') || role.permissions.has('MOVE_MEMBERS') || role.permissions.has('MANAGE_NICKNAMES') || role.permissions.has('MANAGE_ROLES') || role.permissions.has('MANAGE_WEBHOOKS') || role.permissions.has('MANAGE_EMOJIS_AND_STICKERS'))) {
			permission = 'Moderator';
		}
		else {
			permission = 'Member';
		}

		const status = {
			false: 'No',
			true: 'Yes',
		};

		const roleemebed = new MessageEmbed()
			.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
			.setTitle('Role Information')
			.setDescription(`**• ID:** ${role.id}\n**• Name:** ${role.name}\n**• Mention:** ${role}\n**• Hex:** ${role.hexColor.toUpperCase()}\n**• Members with this role:** ${memberCount}\n**• Position:** ${role.position}\n**• Hoisted status:** ${status[role.hoist]}\n**• Mentionable:** ${status[role.mentionable]}\n**• Permission:** ${permission}`)
			.setColor('#00ff00')
			.setThumbnail(role.guild.iconURL({ dynamic: true }))
			.setTimestamp()
			.setFooter(client.user.tag, client.user.avatarURL({ dynamic: true }));

		interaction.reply({ embeds: [roleemebed] });
	},
};