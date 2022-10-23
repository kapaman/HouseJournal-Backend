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
const View_1 = __importDefault(require("../models/View"));
const router = (0, express_1.Router)();
router.get("/", ((_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const results = yield View_1.default.find({});
        res.json(results);
    }
    catch (err) {
        next(err);
    }
})));
router.put("/:id", ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weight = (0, utils_1.getWeight)(req.body);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const results = yield View_1.default.find({ _id: req.params.id });
        if ((results === null || results === void 0 ? void 0 : results.length) == 0) {
            const error = new Error("The requested resource does not exist " + req.originalUrl);
            res.status(404);
            return next(error);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const resultsUpdate = yield View_1.default.updateOne({
            _id: req.params.id,
        }, {
            $set: {
                weight: weight,
            },
        });
        res.json(resultsUpdate);
    }
    catch (err) {
        next(err);
    }
})));
exports.default = router;
