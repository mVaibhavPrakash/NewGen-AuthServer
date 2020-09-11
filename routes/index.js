const express = require('express');
const router = express.Router();
const Newsapi = require('newsapi');
const newsapi = new Newsapi('a83d8edb713f48cbad8a43efd739abc9');

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
