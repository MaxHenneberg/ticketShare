const Currency = require('../models/group/currency');
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
	switch (method) {
		case "create": {
			return [
                body("name", "Currency Name Required").exists().not().isEmpty(),
                body("short_form", "Currency ShortName Required").exists().not().isEmpty(),
            ];
		}
	}
};
exports.create = async (req, res) =>  {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}
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
exports.getAll = async (req, res) =>  {
    try {
        let c = await Currency.find({}).select('name');
        console.log(c);
        return res.status(200).send(c);
    } catch (error) {
        return res.status(400).send({
			errors: error,
		});
    }
    
};