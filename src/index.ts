// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
require("dotenv").config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import PropertyRouter from "./routers/PropertyRouter";
import viewRouter from "./routers/ViewsRouter";
import { notFound, errHandler } from "./middlewares";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use("/properties", PropertyRouter);
app.use("/views", viewRouter);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const uri: string = process.env.MONGO_URI!;

const options: mongoose.ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(uri, options)
  .then((_result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(notFound);

app.use(errHandler);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log("Listening at PORT " + PORT);
});
