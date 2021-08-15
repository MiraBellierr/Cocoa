const { Client, Collection } = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');


const client = new Client({
	allowedMentions: { parse: ['users'] },
	intents: [
		'DIRECT_MESSAGES',
		'DIRECT_MESSAGE_REACTIONS',
		'DIRECT_MESSAGE_TYPING',
		'GUILDS',
		'GUILD_BANS',
		'GUILD_EMOJIS_AND_STICKERS',
		'GUILD_INTEGRATIONS',
		'GUILD_INVITES',
		'GUILD_MEMBERS',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS',
		'GUILD_MESSAGE_TYPING',
		'GUILD_PRESENCES',
		'GUILD_VOICE_STATES',
		'GUILD_WEBHOOKS',
	],
});

client.snipeMap = new Map();
client.queue = new Map();
client.commands = new Collection();
client.categories = fs.readdirSync('./src/commands/');

['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

const connect = async () => await mongoose.connect('mongodb://localhost/cocoa', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
connect();

client.login(process.env.TOKEN);