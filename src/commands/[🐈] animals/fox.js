const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'fox',
	description: 'shows fox picture',
	category: '[🐈] animals',
	run: async (client, interaction) => {
		const response = await fetch('https://randomfox.ca/floof/');

		await response.json().then((res) => {
			const embed = new MessageEmbed()
				.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
				.setColor('RANDOM')
				.setTitle('Fox Picture')
				.setImage(res.image);

			interaction.reply({ embeds: [embed] });
		});
	},
};