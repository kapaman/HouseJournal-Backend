const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  address: String,
  beds: Number,
  bathrooms: Number,
  area: Number,
  price: String,
  img: String,
  rating: Number,
  parts: [{
    name: String,
    description: String,
    rating: Number,
    img: String,
  }]

})

const Property = mongoose.model('Property', propertySchema);


propertySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})




module.exports = Property;
