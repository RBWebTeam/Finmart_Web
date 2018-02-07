var express = require('express');
var router = express.Router();
var Login=require('../controller/LoginController')
var base=require('../controller/baseController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('camera', { title: 'Express' });
});
router.get('/login',function (req, res,next) {
    res.render('login');
});
router.post('/authenticate', function (req, res) {
  Login.login_process(req,res,function(data){
        if(data){
            req.session.user_details=data;
            res.redirect('/dashboard');
            //base.send_response("Success", data[0][0],res);
        }else{
            base.send_response("Failure", "",res);
        }
  });

});
router.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/login');
});     
router.get('/dashboard', checkAuth, function (req, res) {
  res.send('if you are viewing this page it means you are logged in');
});
function checkAuth(req, res, next) {
    console.log(req.session);
  if (!req.session.user_details) {
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
