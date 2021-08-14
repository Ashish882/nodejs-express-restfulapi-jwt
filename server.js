// 'use strict'

// const express = require('express');
// const bodyParser = require('body-parser');


// const  jwt  =  require('jsonwebtoken');

// require('./config/db');

// const app = express();

// var routes = require('./routes/todoRoutes');
// routes(app);

// const port = process.env.PORT || 4000;

// app.routes(bodyParser.urlencoded({ extended:true }));
// app.routes(bodyParser.json());

// //

// // Token Verification 
// app.use((req, res, next) => {
//     if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//     jwt.verify(req.headers.authorization.split(' ')[1], 'RESTfulAPIs', (err, decode) => {
//     if (err) req.user = undefined;
//     req.user = decode;
//     next();
//         });
//     } else {
// req.user = undefined;
// next();
//     }
// });

// app.get('/',(req,res) => {

//     res.send('Hello World!');
// });

// app.listen(port,() =>{

//     console.log('Listening on port ' + port);

// });

'use strict'

// require express and bodyParser
const  express = require("express");
const  bodyParser = require("body-parser");

// create express app
const  app = express();
require("./api/config/db");

// Import API route
//import routes
const routes = require("./api/routes/todoRoutes");
//routes(app);



// define port to run express app
const  port = process.env.PORT || 4000;

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

// Add endpoint

var route = require('./api/routes/route');


//both index.js and things.js should be in same directory
app.use(route);

// Token Verification 
app.use((req, res, next) => {
   
    
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]) {
    jwt.verify(req.headers.authorization.split(' ')[1], 'process.env.JWT_SECRET', (err, decode) => {
    if (err) {
        console.log("Error: " + err);
        req.user = undefined;
    }
    req.user = decode;
    next();
        });
    } else {
req.user = undefined;
console.log(req.user);
next();
    }
});


app.get('/get', (req, res) => {
    
    res.send({
        message: req.user
    });

});

// Listen to server
app.listen(port, () => {

console.log(`Server running at http://localhost:${port}`);
});