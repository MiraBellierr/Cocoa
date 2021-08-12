module.exports = {
	name: 'echo',
	description: 'echo the input',
	category: '[✨] utility',
	options: [{
		name: 'input',
		description: 'input to be echoed',
		type: 3,
		required: true,
	}],
	run: async (client, interaction) => {
		interaction.reply(interaction.options.getString('input'));
	},
};