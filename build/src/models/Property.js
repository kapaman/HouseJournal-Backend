"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const propertySchema = new mongoose_1.Schema({
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
const Property = (0, mongoose_1.model)("Property", propertySchema);
propertySchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        delete returnedObject.__v;
    },
});
exports.default = Property;
