const { register } = require('../handlers/register');

module.exports = async (client, guild) => {
	register(client, guild.id);
};