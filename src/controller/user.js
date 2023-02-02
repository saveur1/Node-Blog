const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.get_all_users = (req,res,next) => {
    const limitValue = req.query.limit || 5;
    const page = req.query.page || 1;
    let skip = page * limitValue-limitValue;
    User.find()
   .limit(limitValue)
   .skip(skip)
   .exec()
   .then(docs => {
    res.status(200).json({
        "counts" :docs.length,
        "page"   :page,
        "result" : docs,
        previous_page : process.env.BLOG_URL+`/user?page=${page-1}&data_per_page=${limitValue}`,
        next_page     : process.env.BLOG_URL+`/user?page=${parseInt(page)+1}&data_per_page=${limitValue}`
    });
   })
   .catch(error => {
    console.log(error);
      res.status(500).json({
          error:error
      });
   });
};

exports.insert_new_user = (req,res,next) => {
    User.findOne({"email":req.body.email})
        .then(doc =>  {
            if(doc) {
                return res.status(422).json({
                    message:"Email Already Exists"
                });
            }
            else {
                bcrypt.hash(req.body.password,10,(error,hash) => {
                    if(error) {
                        return res.status(500).json({
                              error:error
                        });
                    }
                    else {
                        const newUser = new User({
                            _id        : new mongoose.Types.ObjectId(),
                            first_name : req.body.first_name,
                            last_name  : req.body.last_name,
                            email      : req.body.email,
                            password   : hash,
                            userImage  : process.env.BLOG_URL+"/public/"+req.file.filename
                        });
                        newUser.save()
                        .then(result => {
                           res.status(200).json({
                               "message" : "User inserted successfully",
                               "insertedUser" : newUser
                           });
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).json({
                               error:error
                            });
                        });
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).json({
               error:error
            });
        });
};

exports.fetch_single_user = (req,res,next) => {
    const userId = req.params.userId;
    User.findById({_id:userId})
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error:error
            });
        });
};

exports.modify_user_info = (req,res,next) => {
    User.updateOne(
        {
            "_id":req.params.updateId
        }, 
        {
          "$set":{
                    first_name : req.body.first_name,
                    last_name  : req.body.last_name,
                    email      : req.body.email,
                    password   : req.body.password,
                    userImage  : process.env.BLOG_URL+"/public/"+req.file.filename
          }
        })
         .exec()
         .then(ack => {
           res.status(201).json({
              message:"User Info Is updated successfully",
              request:{
                type:"GET",
                url:proccess.env.BLOG_URL+"/user/"+req.params.updateId
              }
           });
         })
         .catch(error => {
            res.status(500).json({
               error:error
            });
         });
}

exports.delete_user = (req,res,next) => {
    const deleteId = req.params.deleteId;
    User.deleteOne({_id:deleteId})
        .exec()
        .then(result => {
            res.status(200).json({
              "message" : "User deleted successfully"
            });
        })
        .catch(error => {
            console.log(error);
           res.status(500).json({
            error:error
           });
        });
}

exports.check_login_credentials = (req,res,next) => {
    User.findOne({email:req.body.email})
        .exec()
        .then(doc => {
            if(doc)
            {
                bcrypt.compare(req.body.password,doc.password,(error,same)=> {
                    if(error) {
                        return res.status(500).json({
                           error:error
                        });
                    }
                    if(same) {
                        const token = jwt.sign({
                            _id:doc._id,
                            email:doc.email
                        },
                        process.env.SECRET_KEY,
                        {
                           expiresIn:"1h"
                        })
                        return res.status(200).json({
                             message:"Authantication has passed",
                             token:token
                        });
                    }
                    return res.status(401).json({
                       message:"Authantication failed1"
                    });
                })
            }
            else {
                return res.status(401).json({
                    message:"Authentication failed2"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
               error:error
            });
        })
}