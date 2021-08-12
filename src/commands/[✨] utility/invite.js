module.exports = {
	name: 'invite',
	description: 'send a bot invite link',
	category: '[✨] utility',
	run: async (client, interaction) => {
		interaction.reply({ content: 'Here is the invite link:\n<https://discord.com/api/oauth2/authorize?client_id=873899675135123516&permissions=0&scope=bot%20applications.commands>', ephemeral: true });
	},
};