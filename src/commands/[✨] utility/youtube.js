const yts = require('yt-search');
const { PaginateContent } = require('../../Pagination');

module.exports = {
	name: 'youtube',
	category: '[✨] utility',
	description: 'Search youtube videos',
	options:[{
		name: 'video',
		description: 'video to search',
		type: 3,
		required: true,
	}],
	run: async (client, interaction) => {
		const search = interaction.options.getString('video');

		yts(search, async (err, res) => {
			if (err) return interaction.reply({ content: 'I couldn\'t find this video', ephemeral: true });
			const pages = [];
			for (let i = 0; i < res.videos.length; i++) {
				const values = `Video ${i + 1}/${res.videos.length}\n${res.videos[i].url}`;
				pages.push(values);
			}

			try {
				const paginated = new PaginateContent.DiscordJS(client, interaction, pages);
				await paginated.init();
			}
			catch(err) {
				interaction.reply({ content: 'I couldn\'t find this video', ephemeral: true });
				console.error(err);
			}
		});
	},
};