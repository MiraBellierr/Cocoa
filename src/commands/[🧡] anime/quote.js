const fetch = require('node-fetch');

module.exports = {
	name: 'quote',
	description: 'sends Anime quote',
	category: '[๐งก] anime',
	run: async (client, interaction) => {
		await fetch('https://animechan.vercel.app/api/random').then((res) => res.json()).then((res) => {
			interaction.reply(`**โ${res.quote}โ**\n\n*โ${res.character} (${res.anime})*`);
		});
	},
};

