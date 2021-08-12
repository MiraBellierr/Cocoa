module.exports = async (client, oldMember, newMember) => {
	if (oldMember.guild.id !== '864537979339014184') return;

	if (!oldMember.roles.cache.has('865516134148210689') && newMember.roles.cache.has('865516134148210689')) {
		const generalChannel = oldMember.guild.channels.cache.get('864538020250255401');

		generalChannel.send(welcomeGreet(newMember.user));
	}
};

function welcomeGreet(user) {
	const messages = [
		`${user} just joined the server - glhf!`,
		`${user} just joined. Everyone, look busy!`,
		`${user} just joined. Can I get a heal?`,
		`${user} joined your party.`,
		`${user} joined. You must construct additional pylons.`,
		`Ermagherd. ${user} is here.`,
		`Welcome, ${user}. Stay awhile and listen.`,
		`Welcome, ${user}. We were expecting you ( ͡° ͜ʖ ͡°)`,
		`Welcome, ${user}. We hope you brought pizza.`,
		`Welcome ${user}. Leave your weapons by the door.`,
		`A wild ${user} appeared.`,
		`Swoooosh. ${user} just landed.`,
		`Brace yourselves. ${user} just joined the server.`,
		`${user} just joined. Hide your bananas.`,
		`${user} just arrived. Seems OP - please nerf.`,
		`${user} just slid into the server.`,
		`A ${user} has spawned in the server.`,
		`Big ${user} showed up!`,
		`Where’s ${user}? In the server!`,
		`${user} hopped into the server. Kangaroo!!`,
		`${user} just showed up. Hold my beer.`,
		`Challenger approaching - ${user} has appeared!`,
		`It's a bird! It's a plane! Nevermind, it's just ${user}.`,
		`It's ${user}! Praise the sun! [T]/`,
		`Never gonna give ${user} up. Never gonna let ${user} down.`,
		`Ha! ${user} has joined! You activated my trap card!`,
		`Cheers, love! ${user}'s here!`,
		`Hey! Listen! ${user} has joined!`,
		`We've been expecting you ${user}`,
		`It's dangerous to go alone, take ${user}!`,
		`${user} has joined the server! It's super effective!`,
		`Cheers, love! ${user} is here!`,
		`${user} is here, as the prophecy foretold.`,
		`${user} has arrived. Party's over.`,
		`Ready player ${user}`,
		`${user} is here to kick butt and chew bubblegum. And ${user} is all out of gum.`,
		`Hello. Is it ${user} you're looking for?`,
		`${user} has joined. Stay a while and listen!`,
		`Roses are red, violets are blue, ${user} joined this server with you`,
		`Good to see you, ${user}`,
		`Glad you're here, ${user}`,
		`${user} landed`,
		`${user} is here`,
		`Everyone welcome ${user}`,
		`Yay, you made it, ${user}`,
	];

	return messages[Math.floor((Math.random() * messages.length))];
}