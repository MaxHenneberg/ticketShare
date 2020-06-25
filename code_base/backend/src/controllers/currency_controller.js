const User = require('../models/group/currency');

exports.create = async (req, res) =>  {
    try {
        let c = await Currency.create({name:req.body.name, short_form:req.body.short_form});
        console.log(c);
        return res.status(200).send(c);
    } catch (error) {
        return res.status(400).send({
			errors: error,
		});
    }
    
};