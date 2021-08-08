const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shibe',
    description: 'shows shibe picture',
    category: '[🐈] animals',
    run: async (client, interaction) => {
        const response = await fetch('http://shibe.online/api/shibes');

        await response.json().then((res) => {
            const embed = new MessageEmbed()
                .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
                .setColor('RANDOM')
                .setTitle('Shibe Picture')
                .setImage(res[0])
            
            interaction.reply({ embeds: [embed] });

        });
    }
}