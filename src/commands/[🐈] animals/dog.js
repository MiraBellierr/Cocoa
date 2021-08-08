const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'dog',
    description: 'shows dog picture',
    category: '[🐈] animals',
    run: async (client, interaction) => {
        const response = await fetch('https://random.dog/woof.json');

        await response.json().then((res) => {
            const embed = new MessageEmbed()
                .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true }))
                .setColor('RANDOM')
                .setTitle('Dog Picture')
                .setImage(res.url)
            
            interaction.reply({ embeds: [embed] });

        });
    }
}