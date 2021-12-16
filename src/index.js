require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const helmet = require('helmet')
const cors = require('cors')
const PropertyRouter = require('./routers/PropertyRouter');
const viewRouter = require('./routers/ViewsRouter')
const middlewares = require('./middlewares');


const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(morgan('tiny'))
app.use(helmet())
app.use(cors())
app.use('/properties', PropertyRouter);
app.use('/views', viewRouter);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

// newProp.save().then(res=>{
//   console.log("saved");
//   mongoose.connection.close();
// })
// password= 0UiADZl1yTXplgbe

// app.get('/properties/:id', (req, res) => {
//     let item = data.properties.find(el => el._id == req.params.id);
//     if (item) {
//         res.json(item);
//     } else {
//         res.status(404).json({
//             err: 'Invalid property id'
//         });
//     }
// })

// app.get('/properties', (req, res) => {
//     res.json(data.properties)
// })

// app.post('/properties/:id/parts/', (req, res) => {
//     const id=req.params.id;
//     let newpart=req.body;
//     let selectedProp=(data.properties.find(el=>el._id==id));
//     let np={name:newpart.name,img:newpart.img,description:newpart.description,rating:newpart.rating};
//     selectedProp.parts.push(np);
//     data.properties.find(el=>el._id==id).parts=selectedProp.parts;
//     console.log(data.properties.find(el=>el._id==id).parts);
//     res.status(201).json(req.body);
// })

app.use(middlewares.notFound)

app.use(middlewares.errHandler)

const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
    console.log("Listening at PORT", PORT);
})