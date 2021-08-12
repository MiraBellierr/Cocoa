function reloadMemberCount(client) {
	const kannaGuild = client.guilds.cache.get('864537979339014184');
	const totalChannel = client.channels.cache.get('874265763870019654');
	const humanChannel = client.channels.cache.get('874265294770696282');
	const botChannel = client.channels.cache.get('874265902328193044');
	const human = kannaGuild.members.cache.filter((member) => !member.user.bot).size;
	const bots = kannaGuild.memberCount - human;
	totalChannel.edit({ name: `❔┊Total: ${kannaGuild.memberCount.toLocaleString()}` });
	humanChannel.edit({ name: `👥┊Human: ${human.toLocaleString()}` });
	botChannel.edit({ name: `🤖┊Bots: ${bots.toLocaleString()}` });
}

module.exports = { reloadMemberCount };