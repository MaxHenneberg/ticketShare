const User = require('../models/user/user');

exports.login = function (req, res) {
	res.send("NOT IMPLEMENTED:Login");
};
exports.register = function (req, res) {
	res.send("NOT IMPLEMENTED:Register");
};

exports.findById = function (req, res) {
	User.findById(req.params.id,{},function (err,result) {
		if(err){
			res.statusCode = 400;
			console.error(err);
			res.send(err);
		}
		if(!result){
			res.statusCode = 404;
			res.send(result);
			return;
		}
		res.send(result);
	})
};
