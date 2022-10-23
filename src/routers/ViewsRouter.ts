import { Router, RequestHandler } from "express";
import { MongoView } from "../../types";
import { getWeight } from "../../utils";
import View from "../models/View";
const router = Router();

router.get("/", (async (_req, res, next) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const results: MongoView[] = await View.find({});
    res.json(results);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

router.put("/:id", (async (req, res, next) => {
  try {
    const weight = getWeight(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const results: MongoView[] = await View.find({ _id: req.params.id });
    if (results?.length == 0) {
      const error = new Error(
        "The requested resource does not exist " + req.originalUrl
      );
      res.status(404);
      return next(error);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const resultsUpdate = await View.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          weight: weight,
        },
      }
    );
    res.json(resultsUpdate);
  } catch (err) {
    next(err);
  }
}) as RequestHandler);

export default router;
