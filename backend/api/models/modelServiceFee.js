const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeeSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  fee: {
    type: mongoose.Decimal128,
    required: true,
  },
});

const Fee = mongoose.model('Fee', FeeSchema);

module.exports=Fee;
