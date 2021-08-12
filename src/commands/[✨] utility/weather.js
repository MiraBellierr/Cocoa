const discord = require('discord.js');
const w = require('weather-js2');

module.exports = {
	name: 'weather',
	description: 'Send an information about a weather',
	category: '[✨] utility',
	options: [{
		name: 'location',
		description: 'the location',
		type: 3,
		required: true,
	}],
	run: (client, interaction) => {
		const loc = interaction.options.getString('location');

		w.find({ search: loc, degreeType: 'C', resCount: 1 }, function(err, result) {
			if (err) {
				interaction.reply(err);
				console.error(JSON.stringify(result, null, 2));
			}
			const area = result[0];

			const embed = new discord.MessageEmbed()
				.setAuthor(interaction.user.username, client.user.avatarURL({ dynamic: true }))
				.addField('Weather Information', `**• Name:** ${area.location.name}\n**• Temperature:** ${area.current.temperature}°C\n**• Feels Like:** ${area.current.feelslike}°C\n**• Clouds:** ${area.current.skytext}\n**• Humidity:** ${area.current.humidity}%\n**• Wind Speed:** ${area.current.winddisplay}\n**• Day:** ${area.current.day}\n**• Date:** ${area.current.date}`)
				.setImage(`${area.current.imageUrl}`)
				.setColor('RANDOM')
				.setTimestamp()
				.setFooter(client.user.tag, client.user.avatarURL({ dynamic: true }));

			interaction.reply({ embeds: [embed] });
			return;
		});

	} };