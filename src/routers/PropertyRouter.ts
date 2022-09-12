import { Router } from "express";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { IParts, IProperty, MongoProperty } from "../../types";
import { toNewPart, toNewProperty } from "../../utils";
import Property from "../models/Property";

const router = Router();

// const mongoURI = process.env.MONGO_URI;
// const conn = createConnection(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

// GET ALL
router.get("/", (async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const results: MongoProperty[] = await Property.find(
      {},
      { parts: { img: 0 } }
    );
    return res.json(results);
  } catch (err) {
    return next(err);
  }
}) as RequestHandler);

// get one
router.get("/:id", (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const results: MongoProperty[] = await Property.find({ _id: id });
    if (results?.length > 0) {
      return res.json(results);
    } else {
      const error = new Error(
        "The requested resource does not exist " + req.originalUrl
      );
      res.status(404);
      return next(error);
    }
  } catch (err) {
    return next(err);
  }
}) as RequestHandler);

router.get("/:id/parts", (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const results: MongoProperty[] = await Property.find({ _id: id });
    if (results?.length > 0) {
      res.json(results[0].parts);
    } else {
      const error = new Error(
        "The requested resource does not exist " + req.originalUrl
      );
      res.status(404);
      return next(error);
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

// put on parts
router.put("/:id", (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const newParts: IParts = toNewPart(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const results: MongoProperty[] = await Property.find({ _id: id });
    if (results?.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const results2 = await Property.updateOne(
        {
          _id: id,
        },
        {
          $push: {
            parts: newParts,
          },
        }
      );

      res.json(results2);
    } else {
      const error = new Error(
        "The requested resource does not exist " + req.originalUrl
      );
      res.status(404);
      return next(error);
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

router.post("/", (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newPropObj: IProperty = toNewProperty(req.body);
    const newProp = new Property(newPropObj);

    const result = await newProp.save();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

export default router;
