import mongoose from "mongoose";

const viewSchema = new mongoose.Schema({
  name: String,
  weight: Number,
});

const View = mongoose.model("View", viewSchema);

viewSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
  },
});

export default View;
