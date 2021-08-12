module.exports = async (client, interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	if (!client.commands.has(interaction.commandName)) return;

	try {
		if (command) {
			command.run(client, interaction);
		}
	}
	catch (err) {
		console.error(err);
		interaction.reply('There was an error trying to interact with this command.');
	}
};