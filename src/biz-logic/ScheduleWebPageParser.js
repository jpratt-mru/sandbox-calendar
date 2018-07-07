 const cheerio = require('cheerio');
 const $ = cheerio.load('<h2 class="title">Hello world</h2>');

 function foo() {
     fetch(process.env.PUBLIC_URL + "/raw-data/fall-2018-scrape.html")
         .then(response => response.text())
         .then((result) => { console.log(result); });
 }
 