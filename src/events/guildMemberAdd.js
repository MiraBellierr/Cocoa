const { reloadMemberCount } = require('../handlers/memberCount');

module.exports = async (client) => {
	reloadMemberCount(client);
};