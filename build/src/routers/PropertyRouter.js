"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../../utils");
const Property_1 = __importDefault(require("../models/Property"));
const router = (0, express_1.Router)();
// const mongoURI = process.env.MONGO_URI;
// const conn = createConnection(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });
// GET ALL
router.get("/", ((_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const results = yield Property_1.default.find({}, { parts: { img: 0 } });
        return res.json(results);
    }
    catch (err) {
        return next(err);
    }
})));
// get one
router.get("/:id", ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const results = yield Property_1.default.find({ _id: id });
        if ((results === null || results === void 0 ? void 0 : results.length) > 0) {
            return res.json(results);
        }
        else {
            const error = new Error("The requested resource does not exist " + req.originalUrl);
            res.status(404);
            return next(error);
        }
    }
    catch (err) {
        return next(err);
    }
})));
router.get("/:id/parts", ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const results = yield Property_1.default.find({ _id: id });
        if ((results === null || results === void 0 ? void 0 : results.length) > 0) {
            res.json(results[0].parts);
        }
        else {
            const error = new Error("The requested resource does not exist " + req.originalUrl);
            res.status(404);
            return next(error);
        }
    }
    catch (err) {
        next(err);
    }
})));
// put on parts
router.put("/:id", ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const newParts = (0, utils_1.toNewPart)(req.body);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const results = yield Property_1.default.find({ _id: id });
        if ((results === null || results === void 0 ? void 0 : results.length) > 0) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const results2 = yield Property_1.default.updateOne({
                _id: id,
            }, {
                $push: {
                    parts: newParts,
                },
            });
            res.json(results2);
        }
        else {
            const error = new Error("The requested resource does not exist " + req.originalUrl);
            res.status(404);
            return next(error);
        }
    }
    catch (err) {
        next(err);
    }
})));
router.post("/", ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPropObj = (0, utils_1.toNewProperty)(req.body);
        const newProp = new Property_1.default(newPropObj);
        const result = yield newProp.save();
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
})));
exports.default = router;
