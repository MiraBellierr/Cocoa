const gis = require('../../handlers/imagescraping');
const { PaginateContent } = require('../../Pagination');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'imagesearch',
	description: 'search the image from Google image',
	category: '[✨] utility',
	options: [{
		name: 'search',
		description: 'image to search',
		type: 3,
		required: true,
	}],
	run: async (client, interaction) => {
		const search = interaction.options.getString('search');

		const options = {
			searchTerm: search,
			queryStringAddition: '&tbs=isz:l',
		};

		gis(options, async (err, res) => {
			if (err) {
				console.error(err);
				return interaction.reply('An error occurred');
			}
			else {
				const results = res.map((r, i) => new MessageEmbed().setTitle(search).setImage(r.url).setFooter(`Page ${i + 1}/${res.length}`).setColor('RANDOM').setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp());

				const paginated = new PaginateContent.DiscordJS(client, interaction, results);
				await paginated.init();
			}
		});
	},
};