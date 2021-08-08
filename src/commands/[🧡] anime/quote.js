const fetch = require('node-fetch');

module.exports = {
    name: 'quote',
    description: 'sends Anime quote',
    category: '[🧡] anime',
    run: async (client, interaction) => {
        await fetch('https://animechan.vercel.app/api/random').then((res) => res.json()).then((res) => {
            interaction.reply(`**“${res.quote}”**\n\n*―${res.character} (${res.anime})*`);
        });
    }
}

