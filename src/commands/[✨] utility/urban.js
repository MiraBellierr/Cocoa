const Discord = require('discord.js');
const urban = require('urban');

module.exports = {
	name: 'urban',
	description: 'Send a definition about a word',
	category: '[✨] utility',
	options: [{
		name: 'word',
		description: 'a word to be defined',
		type: 3,
		required: true,
	}],
	run: (client, interaction) => {

		urban(interaction.options.getString('word')).first(json => {

			if (!json) {
				return interaction.reply('nothing found');
			}

			const embed = new Discord.MessageEmbed()
				.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
				.setColor(0x56aaff)
				.setDescription(json.definition)
				.addField('Example', json.example)
				.addField('Upvotes', json.thumbs_up.toString(), true)
				.addField('Downvotes', json.thumbs_down.toString(), true)
				.setFooter(`Written by ${json.author}`)
				.setTimestamp()
				.setTitle(json.word);

			interaction.reply({ embeds: [embed] });

		});
	},
};