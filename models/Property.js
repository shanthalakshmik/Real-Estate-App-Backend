const mongoose = require('mongoose');

// Define the schema for the property
const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  // You can add more fields like images, number of bedrooms, etc.
}, { timestamps: true });

// Create a model based on the schema
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;


