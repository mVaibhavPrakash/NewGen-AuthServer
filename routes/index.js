const express = require('express');
const router = express.Router();
require('dotenv').config();
const Newsapi = require('newsapi');
const api = process.env.NEWS_API.toString();
const newsapi = new Newsapi(api);

var news;
newsapi.v2.topHeadlines({
  category:'technology',
  language:'en',
  country:'us'
}).then(result =>{
news=result;
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/news', function(req, res, next) {
  console.log(news);
  res.render('news', {news:news,title:'Tech News'} );
});

module.exports = router;
