const User = require("../models/userModel");

jwt = require('jsonwebtoken');

bcrypt = require('bcryptjs');


// User Register

exports.mytest = (req,res) => {
console.log("TEst fnc...");

res.status(200).json({message:"Todo deleted"});

}

exports.register = (req,res) => {

    let newUser = new User(req.body);
    if(!req.body.password){
        res.status(400).json({message:"Password is required"});
    }
    newUser.hash_password = bcrypt.hashSync(req.body.password,10);
  
    try {
        newUser.save((err,data) => {
            if(err){
                res.status(400).json({message:err});
            }
            else{
                res.status(201).json(data);
            }
        });
    }
    catch(err){
        res.status(400).json({message:err});
    }

}


    //Login


    exports.signIn = (req,res) => {
        //Find email in user cluster
        if(!req.body.email){
            res.status(400).json({message:"Email is required"});
         }

         if(!req.body.password){
            res.status(400).json({message:"Password is required"});
         }


         try {
            User.findOne({email:req.body.email},(err,data) => {
                if(err){
                    res.status(400).json({message:err});
                }
                else{
                    if(data){
                    if(bcrypt.compareSync(req.body.password,data.hash_password)){
                        let token = jwt.sign({email:data.email}, "process.env.JWT_SECRET", {expiresIn: "7d"});
                        res.status(200).json({token:token,message:"Success"});
                    }
                    else{
                        res.status(400).json({message:"Incorrect password"});
                    }

                }
                else{

                    res.status(400).json({message:"User not found"});
                }

                }

            });
        }
        catch(err){
            res.status(400).json({message:err});
        }
    };



    //     User.findOne({
    //         email:req.body.email
    //     },(err,user) =>{
    //     if (err) throw err;
    //     if(!user){
    //         res.status(401).send({ message: "User not found" });
    //     }
    //     else if(user){
    //         if(!user.comparePassword(req.body.password)){
    //             res.status(401).send({ message: "Incorrect password" });
    //         }
    //         else{
    //             res.json({
    //                 token:jwt.signIn({
    //                     email:user.email,
    //                     fullName:user.fullName,
    //                     _id:user._id

    //                 },'RESTfulAPIs')
    //             });
    //         }

    //     }
    //     });
    // };


    exports.loginRequired = (req,res,next) =>{
        if(req.user){
            res.json({message: 'Authorized User, Action Successful!'});
        }
        else{
            res.status(401).json({message: 'Unauthorized User, Action Failed!'});
        }

    };





