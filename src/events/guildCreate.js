const { registerCommands } = require('../handlers/functions');

module.exports = async (client, guild) => {
	registerCommands(client, guild.id);
};