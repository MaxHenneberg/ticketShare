const Group = require('../models/group/group');

// Gets all groups.
exports.getAllGroups = (req, res) => {
  Group.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  })
};
  
  