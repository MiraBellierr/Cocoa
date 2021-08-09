const { reloadMemberCount } = require("../handlers/memberCount")

module.exports = async (client, member) => {
    if (member.guild.id !== '864537979339014184') return;

    const generalChannel = member.guild.channels.cache.get('864538020250255401');

    generalChannel.send(`Bye ${member.user.user}, hope we will meet again!`);
    reloadMemberCount(client);
}