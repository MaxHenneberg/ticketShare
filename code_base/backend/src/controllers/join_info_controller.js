"use strict";
const Group = require("../models/group/group");
const Join_Info = require("../models/group/joinInformation");
const { check, validationResult } = require("express-validator");

/**
 * Validates the requests
 *
 * @param method Argument from the middleware, name of function who's request is to be validated
 */

exports.validate = (method) => {
	switch (method) {
		case "getFreeSlots": {
			return [
				check("id", "Group ID Required")
					.exists()
					.bail()
					.notEmpty()
					.bail()
					.isMongoId()
					.withMessage("Invalid Value for Group"),
			];
		}
	}
};
// Gets free slots for a given group ID.

exports.getFreeSlots = async (req, res) => {
	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	try {
		let group = await Group.findById(req.params.id)
			.populate({
				path: "ticket",
				select: "initialFreeSlotsLeft maxCoveredPeople",
			})
			.exec();
		var initial_slots = group.ticket.initialFreeSlotsLeft;
		/****
		 *
		 *  Get the documents JoinInfo for the group
		 *  joined users is the number of results
		 **/
		let joinees = await Join_Info.find({ group: group.id }).exec();
		var joined_users = joinees.length;
		/*
         Calculate free slots
        */
		var free_slots = initial_slots - joined_users;
		// Return free slots
		res.status(200).send({ group: group.id, free_slots: free_slots });
	} catch (err) {
		console.log(err);
		err = { errors: [{ msg: err }] };
		return res.status(400).json(err);
	}
};
