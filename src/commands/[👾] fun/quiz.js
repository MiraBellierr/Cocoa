const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { shuffle } = require('../../handlers/shuffleArray');
const { decode } = require('html-entities');

module.exports = {
	name: 'quiz',
	description: 'sends a quiz',
	category: '[👾] fun',
	run: async (client, interaction) => {
		const fetching = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
		const result = await fetching.json();
		const quiz = result.results[0];
		const question = decode(quiz.question);

		quiz.incorrect_answers.push(quiz.correct_answer);
		shuffle(quiz.incorrect_answers);

		const row = new MessageActionRow()
			.addComponents([
				new MessageButton()
					.setCustomId(quiz.incorrect_answers[0])
					.setLabel('A')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId(quiz.incorrect_answers[1])
					.setLabel('B')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId(quiz.incorrect_answers[2])
					.setLabel('C')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId(quiz.incorrect_answers[3])
					.setLabel('D')
					.setStyle('PRIMARY'),
			]);

		const embed = new MessageEmbed()
			.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
			.setTitle(quiz.category)
			.setDescription(`${question}\n\nA. ${quiz.incorrect_answers[0]}\nB. ${quiz.incorrect_answers[1]}\nC. ${quiz.incorrect_answers[2]}\nD. ${quiz.incorrect_answers[3]}`)
			.setColor('RANDOM')
			.setTimestamp();

		const message = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

		const filter = (i) => i.user.id === interaction.user.id;

		message.awaitMessageComponent({ filter, Time: 15000 }).then((i) => {
			if (i.customId === quiz.correct_answer) {
				interaction.editReply({
					embeds: [
						new MessageEmbed()
							.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
							.setTitle(quiz.category)
							.setDescription(`${question}\n\nCorrect, the answer is ${quiz.correct_answer}`)
							.setColor('RANDOM')
							.setTimestamp(),
					],
					components: [],
				});
			}
			else {
				interaction.editReply({
					embeds: [
						new MessageEmbed()
							.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
							.setTitle(quiz.category)
							.setDescription(`${question}\n\nWrong, the answer is ${quiz.correct_answer}`)
							.setColor('RANDOM')
							.setTimestamp(),
					],
					components: [],
				});
			}
		}).catch(err => {
			interaction.editReply({ content: 'An error occured', embeds: [], components: [] });
			console.error(err);
		});
	},
};