const mongoose = require('mongoose');

var uri = "mongodb+srv://ashish:ashish882@cluster0.tbmsk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const  options = {
    useNewUrlParser:  true,
    useUnifiedTopology:  true
    };


mongoose.connect(uri,options).then(() =>{

    console.log("Connected to database");

},(err) =>{
    console.log(err);
});