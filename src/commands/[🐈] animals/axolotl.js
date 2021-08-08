const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'axolotl',
    description: 'shows axolotl picture',
    category: '[🐈] animals',
    run: async (client, interaction) => {
        const response = await fetch('https://axoltlapi.herokuapp.com/');

        await response.json().then((res) => {
            const embed = new MessageEmbed()
                .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
                .setColor('RANDOM')
                .setTitle('Axolotl Picture')
                .setImage(res.url)
            
            interaction.reply({ embeds: [embed] });
        });
    }
}