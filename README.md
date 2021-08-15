# Hi there 👋

Cocoa is the worst Discord bot written in Node.js using Discord.js v13.0.1 wrapper. Using slash command. Also has the most complicated command handler and a very messy code. It includes button pagination class that I made, very not human and hard to use. Enjoy your time.

## Including Button Pagination
very hard to use
```
const { PaginateContent } = require('../../Pagination');

const pages = [embed1, embed2, embed3];

const paginated = new PaginateContent.DiscordJS(client, interaction, pages)
await paginated.init();
```

![](https://www.kannacoco.me/images/pagination.png)
