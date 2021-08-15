const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { shuffleArray } = require('../../handlers/functions');
const { decode } = require('html-entities');
const Quiz = require('../../database/schemas/Quiz');

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
		shuffleArray(quiz.incorrect_answers);

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
			.setDescription(`${question}\n\nA. ${decode(quiz.incorrect_answers[0])}\nB. ${decode(quiz.incorrect_answers[1])}\nC. ${decode(quiz.incorrect_answers[2])}\nD. ${decode(quiz.incorrect_answers[3])}`)
			.setColor('RANDOM')
			.setTimestamp();

		const message = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

		const filter = (i) => i.user.id === interaction.user.id;

		message.awaitMessageComponent({ filter, Time: 15000 }).then(async (i) => {
			if (i.customId === quiz.correct_answer) {
				const user = await Quiz.findOne({ userId: interaction.user.id });

				if (user) {
					await Quiz.updateOne({ userId: interaction.user.id }, { point: user.get('point') + 1 }).catch(err => console.error(err));
				}
				else {
					await Quiz.create({
						userId: interaction.user.id,
						point: 1,
					}).catch(err => console.error(err));
				}

				interaction.editReply({
					embeds: [
						new MessageEmbed()
							.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
							.setTitle(quiz.category)
							.setDescription(`${question}\n\nCorrect, the answer is ${quiz.correct_answer}`)
							.setColor('RANDOM')
							.setFooter(`You get 1 point. Your current point is ${user.get('point') ? user.get('point') : 1}`)
							.setTimestamp(),
					],
					components: [],
				});
			}
			else {
				const user = await Quiz.findOne({ userId: interaction.user.id });

				if (user) {
					await Quiz.updateOne({ userId: interaction.user.id }, { point: user.get('point') - 1 }).catch(err => console.error(err));
				}
				else {
					await Quiz.create({
						userId: interaction.user.id,
						point: -1,
					}).catch(err => console.error(err));
				}

				interaction.editReply({
					embeds: [
						new MessageEmbed()
							.setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
							.setTitle(quiz.category)
							.setDescription(`${question}\n\nWrong, the answer is ${quiz.correct_answer}`)
							.setColor('RANDOM')
							.setFooter(`-1 point penalty. Your current point is ${user.get('point') ? user.get('point') : -1 }`)
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