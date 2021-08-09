const { reloadMemberCount } = require("../handlers/memberCount")

module.exports = async (client, member) => {
    reloadMemberCount(client);
}