const Group = require('../models/group/group');

// Gets all groups.
exports.getAllGroups = (req, res) => {

  try {
    Group.find({}, function(err, result) {
        res.status(200).send(result)
    })
  } catch (err) {
      err = { errors: [{ msg: err }] };
      return res.status(400).json(err);
  }
};
  
  