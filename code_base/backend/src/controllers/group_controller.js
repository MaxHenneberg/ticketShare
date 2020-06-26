const Group = require("../models/group/group");

/**
 * REST function
 * Finds User by id given in req
 * @param req Request
 * @param res Response
 */
exports.findGroupById = function (req, res) {
  console.log("Get Group By Id");
  Group.findById(req.query.id, {}, function (err, result) {
    if (err) {
      console.error(err);
      return res.send(err);
    }
    if (!result) {
      res.statusCode = 404;
      return res.send(result);
    }
    return res.send(result);
  })
};
