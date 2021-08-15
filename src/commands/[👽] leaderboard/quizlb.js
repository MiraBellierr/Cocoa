const Quiz = require('../../database/schemas/Quiz');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'quizlb',
	description: 'shows quiz leaderboard',
	category: '[👽] leaderboard',
	run: async (client, interaction) => {
		const findAllUser = await Quiz.find({}, 'userId point', { sort: 'desc', limit: 10 });

		const leaderboard = findAllUser.map((q, i) => `[${i + 1}] - ${(interaction.guild.members.cache.get(q.userId)).toString()}: ${q.point} points`);

		const embed = new MessageEmbed()
			.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
			.setTitle('Quiz leaderboard')
			.setDescription(leaderboard.join('\n'))
			.setColor('RANDOM')
			.setTimestamp();

		interaction.reply({ embeds: [embed] });

	},
};