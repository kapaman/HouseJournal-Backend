"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const PropertyRouter_1 = __importDefault(require("./routers/PropertyRouter"));
const ViewsRouter_1 = __importDefault(require("./routers/ViewsRouter"));
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb" }));
app.use((0, morgan_1.default)("tiny"));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/properties", PropertyRouter_1.default);
app.use("/views", ViewsRouter_1.default);
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const uri = process.env.MONGO_URI;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default
    .connect(uri, options)
    .then((_result) => {
    console.log("connected to MongoDB");
})
    .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
});
app.use(middlewares_1.notFound);
app.use(middlewares_1.errHandler);
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log("Listening at PORT " + PORT);
});
