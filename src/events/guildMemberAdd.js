const { reloadMemberCount } = require('../handlers/functions');

module.exports = async (client) => {
	reloadMemberCount(client);
};