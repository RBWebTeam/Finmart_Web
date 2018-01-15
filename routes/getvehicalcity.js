// var express = require('express');
// var router = express.Router();
var response_status = require('./responsestatus');


var Get_Vechical_city = function(req, res, next) {
  var soap = require('soap');
    var url = 'http://qa.policyboss.com/SmartQuote.svc?wsdl';
    var args = {};
    soap.createClient(url, function(err, client) {
          client.Get_Vechical_city(args, function(err, result) {
           // res.send(result.Get_Vechical_cityResult['diffgram']['DocumentElement']['tblvehical']);
           data = result.Get_Vechical_cityResult['diffgram']['DocumentElement']['tblvehical'];
           if(data.length>0){
                response_status.success_response(data,'Success',function (return_data) {
                          res.send(return_data);
                });
            }
            else{
                 response_status.failure_response(null,'Failure',function (return_data) {
                          res.send(return_data);
                });
            }
          });
});
};


module.exports = Get_Vechical_city

/*router.get('/Get_Vechical_city', function(req, res, next) {
    var soap = require('soap');
    var url = 'http://qa.policyboss.com/SmartQuote.svc?wsdl';
    var args = {};
    soap.createClient(url, function(err, client) {
          client.Get_Vechical_city(args, function(err, result) {
           // res.send(result.Get_Vechical_cityResult['diffgram']['DocumentElement']['tblvehical']);
           data = result.Get_Vechical_cityResult['diffgram']['DocumentElement']['tblvehical'];
           if(data.length>0){
                response_status.success_response(data,'Success',function (return_data) {
                          res.send(return_data);
                });
            }
            else{
                 response_status.failure_response(null,'Failure',function (return_data) {
                          res.send(return_data);
                });
            }
          });
});
});*/

//module.exports = router;
