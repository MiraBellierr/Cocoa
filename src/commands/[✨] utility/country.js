const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'country',
	description: 'display information about country',
	category: '[✨] utility',
	options: [{
		name: 'country',
		description: 'country name',
		type: 3,
		required: true,
	}],
	run: async (client, interaction) => {
		let name = interaction.options.getString('country');
		let url = `https://restcountries.eu/rest/v2/name/${name}`;
		if (name === 'usa' || name === 'united states') name = 'united states of america';
		if (name === 'india') url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;
		await interaction.reply('*Please Wait...*');

		fetch(url).then(res => res.json()).then(res => {
			const data = res[0];
			data.flag = `https://www.countryflags.io/${data.alpha2Code}/shiny/64.png`;
			const currencies = [];
			const languages = [];
			const regionalBlocs = [];

			for (let i = 0; i < data.currencies.length; i++) {
				currencies.push(data.currencies[i].name);
			}

			for (let i = 0; i < data.languages.length; i++) {
				languages.push(data.languages[i].name);
			}

			for (let i = 0; i < data.regionalBlocs.length; i++) {
				regionalBlocs.push(data.regionalBlocs[i].name);
			}

			const embed = new MessageEmbed()
				.setAuthor(data.name, data.flag)
				.setThumbnail(data.flag)
				.setColor('RANDOM')
				.addField('Country Information', `**• Name:** ${data.name}\n**• Top Level Domain:** ${data.topLevelDomain.join(', ')}\n**• Alpha 2 Code:** ${data.alpha2Code}\n**• Alpha 3 Code:** ${data.alpha3Code}\n**• Calling Codes:** +${data.callingCodes.join(', +')}\n**• Capital:** ${data.capital}\n**• Alt Spellings:** ${data.altSpellings.join(', ')}\n**• Region:** ${data.region}\n**• Sub Region:** ${data.subregion}\n**• Population:** ${data.population.toLocaleString()}`, true)
				.addField('Country Information 2', `**• Cioc:** ${data.cioc}\n**• Currencies:** ${currencies.join(', ')}\n**• Numeric Code:** ${data.numericCode}\n**• Native Name:** ${data.nativeName}\n**• Languages:** ${languages.join(', ')}\n**• Borders:** ${data.borders.join(', ')}\n**• Gini:** ${data.gini === null ? 'none' : data.gini}\n**• Area:** ${data.area.toLocaleString()}\n**• Demonym:** ${data.demonym}\n**• lat lng:** (${data.latlng.join(', ')})`, true)
				.addField('Regional Blocs', regionalBlocs.join(',\n'))
				.addField('Timezones', data.timezones.join(', '));

			interaction.editReply({ embeds: [embed] });
		}).catch(err => {
			interaction.editReply('I didn\'t found any information of that country.');
			console.error(err);
		});
	},
};