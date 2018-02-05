var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login',function (req, res,next) {
    res.render('login');
});
router.post('/authenticate', function (req, res) {
  var post = req.body;
  //res.send(post);
  if (post.email === 'baba@baba.com' && post.pwd === '1234') {
    req.session.user_id = 007;
    res.redirect('/dashboard');
  } else {
    res.send('Bad user/pass');
  }
});
router.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/login');
});     
router.get('/dashboard', checkAuth, function (req, res) {
  res.send('if you are viewing this page it means you are logged in');
});
function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.send('You are not authorized to view this page');
  } else {
    //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  }
}
router.get('/logs', function(req, res, next) {
    const fs = require('fs');

    fs.readFile('./log/exceptions.log', (err, data) => {  
        if (err) throw err;
        let badJSON=data.toString();
        var fixedJSON = badJSON

            // Replace ":" with "@colon@" if it's between double-quotes
            .replace(/:\s*"([^"]*)"/g, function(match, p1) {
                    return ': "' + p1.replace(/:/g, '@colon@') + '"';
            })

            // Replace ":" with "@colon@" if it's between single-quotes
            .replace(/:\s*'([^']*)'/g, function(match, p1) {
                    return ': "' + p1.replace(/:/g, '@colon@') + '"';
            })

            // Add double-quotes around any tokens before the remaining ":"
            .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')

            // Turn "@colon@" back into ":"
            .replace(/@colon@/g, ':')
    ;
        console.log(fixedJSON);
        res.render('show-logs', { data: fixedJSON });
    });
});
//export the module
module.exports = router;
