import { Schema, model } from "mongoose";

const propertySchema = new Schema({
  address: String,
  beds: Number,
  bathrooms: Number,
  area: Number,
  price: String,
  img: String,
  rating: Number,
  parts: [
    {
      name: String,
      description: String,
      rating: Number,
      img: String,
    },
  ],
});

const Property = model("Property", propertySchema);

propertySchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
  },
});

export default Property;
