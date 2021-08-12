const fetch = require('node-fetch');

module.exports = {
	name: 'fact',
	description: 'send a fact on the animal you choose',
	category: '[🐈] animals',
	options: [{
		name: 'animal',
		description: 'choose which animal',
		type: 3,
		required: true,
		choices: [
			{
				name: 'Axololt',
				value: 'axololt_fact',
			},
			{
				name: 'Dog',
				value: 'dog_fact',
			},
			{
				name: 'Cat',
				value: 'cat_fact',
			},
		],
	}],
	run: async (client, interaction) => {
		const value = interaction.options.getString('animal');
		if (value === 'axololt_fact') {
			await fetch('https://axoltlapi.herokuapp.com/').then((res) => res.json()).then((res) => {
				interaction.reply(`**Axololt fact**: ${res.facts}`);
			});
		}
		else if (value === 'dog_fact') {
			await fetch('https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1').then((res) => res.json()).then((res) => {
				interaction.reply(`**Dog fact**: ${res[0].fact}`);
			});
		}
		else {
			await fetch('https://catfact.ninja/facts').then((res) => res.json()).then((res) => {
				interaction.reply(`**Cat fact**: ${res.data[0].fact}`);
			});
		}
	},
};