const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema({
  name: String,
  weight: Number
})
const View = mongoose.model('View', viewSchema);

viewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})


module.exports = View;