"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const viewSchema = new mongoose_1.default.Schema({
    name: String,
    weight: Number,
});
const View = mongoose_1.default.model("View", viewSchema);
viewSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        delete returnedObject.__v;
    },
});
exports.default = View;
