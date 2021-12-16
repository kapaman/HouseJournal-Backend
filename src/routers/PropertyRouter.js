const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const Property = require("../models/Property");
console.log(Property);

const mongoURI = process.env.MONGO_URI;
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});


// GET ALL
router.get('/', async (req, res, next) => {
    try {
        const results = await Property.find({});
        res.json(results)
    } catch (err) {
        next(err);
    }
})

// get one
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const results = await Property.find({ _id: id });
        if (results.length > 0) {
            res.json(results)
        } else {
            const error = new Error('The requested resource does not exist', req.originalUrl);
            res.status(404);
            return next(error);
        }
    } catch (err) {
        next(err);
    }
})

router.get('/:id/parts', async (req, res, next) => {
    try {
        const id = req.params.id;
        const results = await Property.find({ _id: id });
        if (results.length > 0) {
            res.json(results[0].parts)
        } else {
            const error = new Error('The requested resource does not exist', req.originalUrl);
            res.status(404);
            return next(error);
        }
    } catch (err) {
        next(err);
    }
})

// put on parts
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        let parts = req.body;
        console.log(parts);
        if (!parts.name || !parts.rating) {
            const error = new Error('Please fill all the required fields', req.originalUrl);
            res.status(400);
            return next(error);
        }
        const results = await Property.find({ _id: id });
        if (results.length > 0) {
            let currentProp = results[0];
            let results2 = await Property.updateOne({
                _id: id
            }, {
                $push: {
                    "parts": parts
                }
            })


            res.json(results2)
        } else {
            const error = new Error('The requested resource does not exist', req.originalUrl);
            res.status(404);
            return next(error);
        }
    } catch (err) {
        next(err);
    }
})

router.post('/', async (req, res, next) => {
    try {
        let body = req.body;
        console.log(body);
        let newProp = { ...body };
        console.log(newProp);
        if (!newProp.address || !newProp.beds || !newProp.bathrooms || !newProp.area || newProp.price.length == 0 || newProp.price == "$NaN") {
            const error = new Error('Please fill all required fields', req.originalUrl);
            res.status(400);
            return next(error);
        }
        newProp = new Property(newProp);

        let result = await newProp.save();
        res.status(201).json(result);


        // res.json({message:"create new"})
    } catch (err) {
        next(err);
    }
})



// router.delete('/all', async (req, res, next) => {
//     try {
//         const results = await Property.find({});
//         res.json(results)
//     } catch (err) {
//         next(err);
//     }
// })

module.exports = router;