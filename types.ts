import { Document } from "mongoose";

export interface IParts {
  name: string;
  description: string;
  rating: number;
  img?: string;
}

export interface IProperty {
  address: string;
  beds: number;
  bathrooms: number;
  area: number;
  price: string;
  img: string;
  parts: IParts[];
}

export interface MongoProperty extends Omit<IProperty, "parts">, Document {
  parts: (IParts & Document)[];
}

// views

export interface View {
  name: string;
  weight: number;
}

export interface MongoView extends View, Document {}
