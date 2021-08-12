const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
	name: 'help',
	category: '[✨] utility',
	description: 'Returns all commands',
	run: async (client, interaction) => {

		return getAll(client, interaction);
	},
};

function getAll(client, interaction) {
	const embed = new MessageEmbed()
		.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
		.setColor('RANDOM')
		.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
		.setTimestamp()
		.setTitle(`${client.user.username} Help Command`);

	const commands = (category) => {
		return client.commands
			.filter(cmd => cmd.category === category)
			.map(cmd => ' ' + `\`${cmd.name}\``);
	};

	const info = client.categories
		.map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
		.reduce((string, category) => string + '\n' + category);

	return interaction.reply({ embeds: [embed.setDescription(info).setTimestamp()] });
}