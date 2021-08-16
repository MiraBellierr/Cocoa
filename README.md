# Hi there 👋

Cocoa is the worst Discord bot written in Node.js using Discord.js v13.0.1 wrapper. Using slash command. Also has the most complicated command handler and a very messy code. It includes button pagination class that I made, very not human and hard to use. Enjoy your time.

## 1. Including Button Pagination
very hard to use and very unhuman
### Usage
```js
const { PaginateContent } = require('../../Pagination');

const pages = [embed1, embed2, embed3];

const options = {
  time: 180000,
};

const emojis = {
  backward: '869052152331509781',
  stop: '869052152260214794',
  forward: '869052152012746783',
};

const paginated = new PaginateContent.DiscordJS(client, interaction, pages, options, emojis);
await paginated.init();
```
### Output
![](https://www.kannacoco.me/images/pagination.png)

## 2. Also including Google image search
hard to use
### Usage
```js
const gis = require('../../handlers/imagescraping');

const options = {
  searchTerm: 'cats',
  queryStringAddition: '&tbs=isz:l',
  filterOutDomains: ['gstatic.com'],
};

gis(options, (err, res) => {
  if (err) {
    console.error(err);
  }
  else {
    console.log(res);
  }
});
```
### Output
```sh
[
  {
    url: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg',
    width: 1800,
    height: 1200
  },
  {
    url: 'https://static.scientificamerican.com/sciam/cache/file/32665E6F-8D90-4567-9769D59E11DB7F26_source.jpg',
    width: 4500,
    height: 3587
  },
  {
    url: 'https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib\\u003drb-1.1.0\\u0026q\\u003d45\\u0026auto\\u003dformat\\u0026w\\u003d1200\\u0026h\\u003d1200.0\\u0026fit\\u003dcrop',
    width: 1200,
    height: 1200
  },
  ...
]
```

### Parameter
#### options
- searchTerm: `String`
- queryStringAddition: `String`
- filterOutDomains: `Array<String>`
#### callbacks
```js
function callback(err, res) {
  if (err) {
    // do something
  }
  else {
    // do something
  }
}
```
