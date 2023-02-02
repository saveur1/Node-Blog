const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
    {
        title: {
            type:String,
            required:true
        },
        body: {
            type:String,
            required:true
        },
        user: {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        blogImage:{
            type:String,
            required:false
        }
    },
    {
        timestamps:true,
        writeConcern:{
        w:"majority",
        j:true,
        wtimeout:1000
        }
    });

    module.exports = mongoose.model("Blogs",blogSchema);