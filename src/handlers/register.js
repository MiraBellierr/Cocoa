const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

async function register(client, guildId) {
	// eslint-disable-next-line no-unused-vars
	const commands = client.commands.map(({ run, category, ...data }) => data);

	const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

	(async () => {
		try {
			console.log('Started refreshing application (/) commands.');

			await rest.put(
				Routes.applicationGuildCommands(client.user.id, guildId),
				{ body: commands },
			);

			console.log(`Successfully reloaded application (/) commands for ${guildId}`);
		}
		catch (error) {
			console.error(error);
		}
	})();
}

module.exports = { register };