"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeight = exports.toNewProperty = exports.toNewPart = void 0;
const toNewPart = (obj) => {
    const newPartObj = {
        name: parseName(obj.name),
        description: parseDescription(obj.description),
        rating: parseRating(obj.rating),
        img: parseImage(obj.img),
    };
    return newPartObj;
};
exports.toNewPart = toNewPart;
const toNewProperty = (obj) => {
    const newPropObj = {
        address: parseName(obj.address),
        beds: parseQuantity(obj.beds),
        bathrooms: parseQuantity(obj.bathrooms),
        area: parseQuantity(obj.area),
        price: parseName(obj.price),
        parts: [],
        img: parseName(obj.img),
    };
    return newPropObj;
};
exports.toNewProperty = toNewProperty;
const getWeight = (obj) => {
    const weight = parseWeight(obj.weight);
    return weight;
};
exports.getWeight = getWeight;
const parseWeight = (weight) => {
    if (typeof weight === "string" ||
        !isNumber(weight) ||
        weight < 1 ||
        weight > 5) {
        throw new Error("weight is missing/not a valid number: " + weight);
    }
    return weight;
};
const parseQuantity = (quant) => {
    if (typeof quant === "string" || !isNumber(quant) || quant < 1) {
        throw new Error("beds/bathrooms/area is missing/not a number: " + quant);
    }
    return quant;
};
const parseImage = (img) => {
    if (!img || !isString(img)) {
        throw new Error("Incorrect or missing img: " + img);
    }
    return img;
};
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isNumber = (num) => {
    return typeof num === "number" && !isNaN(Number(num));
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name: " + name);
    }
    return name;
};
const parseDescription = (desc) => {
    if (!isString(desc)) {
        throw new Error("Incorrect or missing description: " + desc);
    }
    return desc;
};
const parseRating = (rating) => {
    if (typeof rating === "string" || !isNumber(rating) || rating < 0.5) {
        throw new Error("Rating is missing/not a number: " + rating);
    }
    return rating;
};
