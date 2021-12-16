const express = require('express');
const View = require("../models/View");
const router = express.Router();


router.get('/', async (req, res, next) => {
    // res.json(data.views)
    try {
        let results = await View.find({});
        res.json(results)
    } catch (err) {
        next(err);
    }
})
router.put('/:id', async (req, res, next) => {
    // let item = data.views.find(el => el._id == req.params.id);
    // if (item) {
    //     res.json(item);
    // } else {
    //     res.status(404).json({
    //         err: 'Invalid view id'
    //     })
    // }
    try {
        let body = req.body;
        let results = await View.find({ _id: req.params.id });
        if (results.length == 0) {
            const error = new Error('The requested resource does not exist', req.originalUrl);
            res.status(404);
            return next(error);
        }
        let resultsUpdate = await View.updateOne({
            _id: req.params.id
        }, {
            $set: {
                "weight": body.weight
            }
        })
        res.json(resultsUpdate);
    } catch (err) {
        next(err);
    }
})

module.exports = router;