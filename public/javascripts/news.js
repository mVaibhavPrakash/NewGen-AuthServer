const Newsapi = require('newsapi');
const newsapi = new Newsapi('a83d8edb713f48cbad8a43efd739abc9');

var news;
newsapi.v2.topHeadlines({
    category:'technology',
    language:'en',
    country:'us'
}).then(res =>{
    news=res;
});

module.exports = news;