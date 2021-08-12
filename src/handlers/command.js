const { readdirSync } = require('fs');

const ascii = require('ascii-table');

const table = new ascii('Commands');
table.setHeading('Command', 'Load status');

module.exports = (client) => {
	readdirSync('./src/commands/').forEach((dir) => {
		const commands = readdirSync(`./src/commands/${dir}/`).filter((file) => file.endsWith('.js'));

		for (const file of commands) {
			const pull = require(`../commands/${dir}/${file}`);

			if (pull.name) {
				client.commands.set(pull.name, pull);
				table.addRow(file, '✅');
			}
			else {
				table.addRow(file, '❎ -> missing a help.name, or help.name is not a string.');
				continue;
			}
		}
	});

	console.log(table.toString());
};
