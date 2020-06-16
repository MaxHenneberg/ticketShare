const braintree = require("braintree");

const ClientToken = require("../models/payment/clientToken");
const Group = require("../models/group/group");
const Address = require("../models/user/address");
const Transaction = require("../models/payment/transaction");

const dbUtil = require("../models/dbUtil");

function init() {
  console.log("Init Gateway");
  return braintree.connect(
      {accessToken: "access_token$sandbox$s6h9q2zw28ctdgzz$b19d08429d0a927c0499cc1a920f7454"});
}

exports.generateClientToken = function (req, res) {
  const gateway = init();
  console.log("Try to generate Client Token");
  gateway.clientToken.generate({}, function (err, result) {
    if (err) {
      console.error(err);
      res.statusCode = 401;
      return res.send({error: err});
    }
    if (!result.success) {
      return res.send({error: "Could not create Token!"});
    }
    console.log("Created Token: \n" + result.clientToken);
    const token = new ClientToken(
        {user: req.user._id, token: result.clientToken});
    token.save();
    return res.send({clientToken: result.clientToken});
  });
};

exports.createTransaction = function (req, res) {
  const gateway = init();
  if (!(req.body.group && req.body.paymentAddress && req.body.payment_nonce)) {
    res.statusCode = 400;
    return res.send({error: "Missing Body Parameter"});
  }

  Group.findById(req.body.group, {}, {}, function (errorGroup, group) {
    let handleErrorRet = dbUtil.handleCallback(errorGroup, group);
    if (handleErrorRet) {
      res.statusCode = handleErrorRet.statusCode;
      return res.send({error: handleErrorRet.error});
    }
    Address.findById(req.body.paymentAddress, {}, {},
        function (errorAddress, address) {
          handleErrorRet = dbUtil.handleCallback(errorAddress, address);
          if (handleErrorRet) {
            res.statusCode = handleErrorRet.statusCode;
            return res.send({error: handleErrorRet.error});
          }
          const saleRequest = buildSaleRequest(group, address, req.user);
          const transaction = new Transaction({
            amount: saleRequest.amount,
            merchantAccountId: saleRequest.merchantAccountId,
            paymentMethodNonce: saleRequest.paymentMethodNonce,
            orderId: saleRequest.orderId,
            description: saleRequest.descriptor.name,
            shipping: address._id,
            payed: false
          });

          gateway.transaction.sale(saleRequest, function (err, result) {

            if (err) {
              res.statusCode = 400;
              res.send("TransactionError");
            } else if (result.success) {
              transaction.paypalTransactionId = result.transaction.id;
              transaction.save();
              res.send("TransactionSuccess");
            } else {
              res.send(result.message);
            }
          })
        });
  });
};

function buildSaleRequest(group, address, user) {
  return {
    amount: group.priceAmount,
    merchantAccountId: group.priceUnit,
    paymentMethodNonce: req.body.payment_nonce,
    orderId: "Tmp",
    descriptor: {
      name: "Tmp Desc"
    },
    shipping: {
      firstName: user.firstname,
      lastName: user.lastName,
      company: "-",
      streetAddress: address.street + " " + address.streetNumber,
      extendenAddress: "",
      locality: address.city,
      postalCode: address.countryCode,
      countryCodeAlpha2: address.country
    },
    submitForSettlement: true
  }
}

