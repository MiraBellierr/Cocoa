const getSource = require('get-source');
const beautify = require('beautify');
const fs = require('fs');
const { PaginateContent } = require('../../Pagination');

module.exports = {
	name: 'source',
	description: 'display a source code of a command',
	category: '[📚] info',
	options: [{
		name: 'command',
		description: 'a command name',
		type: 3,
		required: true,
	}],
	run: async (client, interaction) => {
		fs.readdirSync('./src/commands').forEach(dir => {
			fs.readdirSync(`./src/commands/${dir}`).forEach(async file => {
				if (file === `${interaction.options.getString('command')}.js`) {
					const source = getSource(`./src/commands/${dir}/${file}`);
					const splitString = [];
					let i = 0;
					while (i < source.text.length) {
						splitString.push(source.text.slice(i, i + 1200));
						i = i + 1200;
					}

					const splitStringMap = splitString.map((str, index) => `Path: \`${source.path}\`\n\`\`\`js\n${beautify(str, { format: 'js' })}\n\`\`\`\nPage ${index + 1}/${splitString.length}`);

					const paginated = new PaginateContent.DiscordJS(client, interaction, splitStringMap);
					await paginated.init();
				}
			});

		});
	},
};