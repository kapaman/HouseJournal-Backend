import { IParts, IProperty } from "./types";

export const toNewPart = (obj: any): IParts => {
  const newPartObj: IParts = {
    name: parseName(obj.name),
    description: parseDescription(obj.description),
    rating: parseRating(obj.rating),
    img: parseImage(obj.img),
  };
  return newPartObj;
};

export const toNewProperty = (obj: any): IProperty => {
  const newPropObj: IProperty = {
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

export const getWeight = (obj: any): number => {
  const weight = parseWeight(obj.weight);
  return weight;
};

const parseWeight = (weight: unknown) => {
  if (
    typeof weight === "string" ||
    !isNumber(weight) ||
    weight < 1 ||
    weight > 5
  ) {
    throw new Error("weight is missing/not a valid number: " + weight);
  }
  return weight;
};

const parseQuantity = (quant: unknown) => {
  if (typeof quant === "string" || !isNumber(quant) || quant < 1) {
    throw new Error("beds/bathrooms/area is missing/not a number: " + quant);
  }
  return quant;
};

const parseImage = (img: unknown) => {
  if (!img || !isString(img)) {
    throw new Error("Incorrect or missing img: " + img);
  }
  return img;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === "number" && !isNaN(Number(num));
};

const parseName = (name: unknown) => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
};

const parseDescription = (desc: unknown) => {
  if (!isString(desc)) {
    throw new Error("Incorrect or missing description: " + desc);
  }
  return desc;
};

const parseRating = (rating: unknown): number => {
  if (typeof rating === "string" || !isNumber(rating) || rating < 0.5) {
    throw new Error("Rating is missing/not a number: " + rating);
  }
  return rating;
};
