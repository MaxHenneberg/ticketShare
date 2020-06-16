const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
      user: mongoose.Types.ObjectId,
      amount: Number,
      merchantAccountId: String,
      paymentMethodNonce: String,

      orderId: String,
      description: String,
      shipping: {
        address: mongoose.Types.ObjectId
      },
      paypalTransactionId: String,
      payed: Boolean
    },
    {timestamps: true}
);

module.exports = mongoose.model("clientToken", TransactionSchema);
