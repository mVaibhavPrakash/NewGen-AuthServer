const express = require('express');
const router = express.Router();
require('dotenv').config();
const api=process.env.NEWS_API;

const Newsapi = require('newsapi');
const newsapi = new Newsapi(api);

var news;
newsapi.v2.topHeadlines({
    category:'technology',
    language:'en',
    country:'us'
}).then(res =>{
    news=res;
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/news', function(req, res, next) {
  res.render('news',{news:news,title:'Tech News'})
});

module.exports = router;
