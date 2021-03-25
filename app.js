const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//Online mongoDB connection
/*
mongoose.connect('mongodb+srv://code_tochi:'+
    process.env.MONGO_ATLAS_PWD +'@node-rest-shop.ff5iz.mongodb.net/'+
    process.env.DATABASE +'?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }
); */

// Localhost mongoDB connection
mongoose.connect('mongodb://localhost:27017/node-rest-shop', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(response => {
        console.log("MongoDB Connected Successfully");
    }).catch( err => {
    console.log("Database Connection Failed.");
})



//Use morgan
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


//Handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods',
            'PUT,POST,PATCH,DELETE,GET'
        );
        return res.json({});
    }
    next();

});


// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// handling errors
app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})


app.use((error, req, res, next) => {
    res.status(error.status ||500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;