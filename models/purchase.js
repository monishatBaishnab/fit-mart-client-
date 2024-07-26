const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    }
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cash_on_delivery', 'strip'],
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing',
  },
}, {timestamps: true});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
