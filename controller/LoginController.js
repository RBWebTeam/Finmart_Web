var con=require('../bin/dbconnection.js');
var base=require('./baseController');
var wrapper = require('./wrapper.js');

class Login{};

Login.login_process = function(req, res, next) {

// console.log(res.body);
var loginparameter = [];
loginparameter.push(req.body.UserName);
loginparameter.push(req.body.Password);
loginparameter.push(req.body.DeviceId);
loginparameter.push(req.body.IpAdd);
loginparameter.push(req.body.VersionNo);

con.execute_proc('call spValidateLogin(?,?,?,?,?)',loginparameter,function(data) {
	//res.send(data[0][0]);
	//base.send_response(data);
	console.log(data);
	if(data[0][0].SuccessStatus == "1"){
		data[0][0].POSPInfo = data[0][0].POSPName + "~" + data[0][0].POSPMobile + "~" + data[0][0].POSEmail;
        data[0][0].FSM = data[0][0].FSMFullname + "~" + data[0][0].FSMEmail + "~" + data[0][0].FSMMobile + "~" + data[0][0].FSMDesig;
		next(data);
	}
	else{
	       next(null);
	}
});
    
};
Login.login=(req,res,next)=>{
    login_process(req,res,function(data){
        if(data){
            base.send_response("Success", data[0][0],res);
        }else{
            base.send_response("Failure", "",res);
        }
    });
    //next();
};



module.exports = Login;