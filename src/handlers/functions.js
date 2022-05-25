const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v8");

module.exports = {
	reloadMemberCount: async function (client) {
		const kannaGuild = await client.guilds.fetch("864537979339014184");
		const totalChannel = await client.channels.fetch("874265763870019654");
		const humanChannel = await client.channels.cache.get("874265294770696282");
		const botChannel = await client.channels.fetch("874265902328193044");
		const members = await kannaGuild.members.fetch();
		const human = members.filter((member) => !member.user.bot).size;
		const bots = kannaGuild.memberCount - human;
		totalChannel.edit({
			name: `❔┊Total: ${kannaGuild.memberCount.toLocaleString()}`,
		});
		humanChannel.edit({ name: `👥┊Human: ${human.toLocaleString()}` });
		botChannel.edit({ name: `🤖┊Bots: ${bots.toLocaleString()}` });

		return console.log("counter updated");
	},
	shuffleArray: function (array) {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex !== 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	},
	registerCommands: async function (client, guildId) {
		// eslint-disable-next-line no-unused-vars
		const commands = client.commands.map(({ run, category, ...data }) => data);

		const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

		(async () => {
			try {
				console.log("Started refreshing application (/) commands.");

				await rest.put(
					Routes.applicationGuildCommands(client.user.id, guildId),
					{ body: commands }
				);

				console.log(
					`Successfully reloaded application (/) commands for ${guildId}`
				);
			} catch (error) {
				console.error(error);
			}
		})();
	},
	formatDate: function (date) {
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: "UTC",
		};
		return new Intl.DateTimeFormat("en-US", options).format(date);
	},
};
