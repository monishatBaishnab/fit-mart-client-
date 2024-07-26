const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, 
  images: { type: String, required: true },
  rating: { type: Number, required: false, default: 0 },
  features: { type: [String], required: true },
  specifications: {
    dimensions: { type: String, required: false },
    weight: { type: String, required: false },
    maximumUserWeight: { type: String, required: false },
    material: { type: String, required:false }
  },
  manufacturerDetails: {
    name: { type: String, required: true },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true }
    }
  },
  warranty: { type: String, required: true },
  returnPolicy: { type: String, required: true }
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
