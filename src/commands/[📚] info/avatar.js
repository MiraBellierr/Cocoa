const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'avatar',
	description: 'display user\'s avatar',
	category: '[📚] info',
	options: [{
		name: 'user',
		description: 'choose the user',
		type: 6,
	}],
	run: async (client, interaction) => {
		const user = interaction.options.getUser('user') || interaction.user;

		const embed = new MessageEmbed()
			.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
			.setTitle(`${user.username}'s avatar`)
			.setColor('RANDOM')
			.setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
			.setTimestamp()
			.setFooter(client.user.tag, client.user.avatarURL({ dynamic: true }));

		interaction.reply({ embeds: [embed] });
	},
};