const Group = require("../models/group/group");
const dbUtil = require("../models/dbUtil");

exports.getGroupById = function (req, res) {
  const groupId = req.params.group;
  if(!groupId){
    res.statusCode = 400;
    return res.send({error: "Missing Parameter: Group"});
  }
  console.log("Try to find Group for id: "+groupId)
  Group.findById(groupId, {}, {}, function (err, group) {
    const groupRespone = dbUtil.handleCallback(err, group);
    if (groupRespone) {
      res.statusCode = groupRespone.statusCode;
      return res.send({error: groupRespone.error});
    }
    const response = {
      group: group,
    };
    return res.send(response);
  });
};
