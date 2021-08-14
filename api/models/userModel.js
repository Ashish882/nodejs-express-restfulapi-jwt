'use strict';
// Import mongoose
    const mongoose = require("mongoose");
    const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    fullName:{
        type: String,
        required: true,
        trim: true,

    },

    email: {
        type:String,
        unique:true,
        lovercase:true,
        trim:true,
        required:true
        } ,
        
    hash_password: {
    type:String,
    required:true
    },
    
    createdOn: {
    type:  Date,
    default:  Date.now
    }

});


UserSchema.methods.comparePassword = function(password){
 
    return bcrypt.campareSync(password, this.hash_password);

}

module.exports = mongoose.model('User', UserSchema);