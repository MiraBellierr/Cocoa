const Discord = require('discord.js');
const ud = require('urban-dictionary');
const { PaginateContent } = require('../../Pagination');

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

		ud.define(interaction.options.getString('word')).then(async (results) => {
			const pages = [];


			for (let i = 0; i < results.length; i++) {
				const embed = new Discord.MessageEmbed()
					.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
					.setColor(0x56aaff)
					.setDescription(results[i].definition)
					.addField('Example', results[i].example)
					.addField('Upvotes', results[i].thumbs_up.toString(), true)
					.setFooter(`Written by ${results[i].author} | Page ${i + 1}/${results.length}`)
					.setTimestamp()
					.setTitle(results[i].word);

				pages.push(embed);
			}

			const paginated = new PaginateContent.DiscordJS(client, interaction, pages);
			await paginated.init();

		}).catch((error) => {
			console.error(`define (promise) - error ${error.message}`);
			interaction.reply({ content: 'I couldn\'t find the definition for this word', ephemeral: true });
		});
	},
};