const Blog = require("../models/blog");
const User = require("../models/user");
exports.get_all_blogs = (req,res,next) => {
    Blog.find()
    .exec()
    .then(docs => {
      let newDocs = docs.map(doc => {
         return {
            _id   :doc._id,
            title :doc.title,
            body  : doc.body,
            user  :doc.user,
            createdAt  :doc.createdAt,
            updatedAt  :doc.updatedAt,
            request    : {
               type:"GET",
               url:"http://localhost:6700/"+doc._id
            }
         }
      });
       res.status(200).json({
          counted:docs.length,
          result:newDocs
       });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
         error:error
      });
    });
};

exports.insert_new_post = (req,res,next) => {
   const user = req.body.user;
   User.findById(user)
   .exec()
   .then(doc => {
      if(doc) {
         const newBlog = new Blog({
             title : req.body.title,
             body  : req.body.body,
             user  : req.body.user
         });
      newBlog.save()
             .then(doc => {
               let created_blog= {
                     _id   :doc._id,
                     title :doc.title,
                     body  : doc.body,
                     user  :doc.user,
                     createdAt  :doc.createdAt,
                     updatedAt  :doc.updatedAt,
                     request    : {
                        type:"GET",
                        url:"http://localhost:6700/"+doc._id
                     }
                   }
               res.status(200).json({
                  message:"Created New Post successfully",
                  created_blog:created_blog
               });
             })
             .catch(error => {
               console.log(error);
               res.status(500).json({
                  error:error
               });
             });
      }
      else {
         return res.status(401).json({
            "message" : "Can't create post without appropriate User id"
         });
      }
   })
   .catch(error => {
       console.log(error);
       res.status(500).json({
           error:error
       });
   });
}

exports.get_single_blog = (req,res,next) => {
 
      Blog.findById({_id:req.params.blogId})
       .exec()
       .then(doc => {
         if(doc)
         {
            res.status(200).json({
               _id   :doc._id,
               title :doc.title,
               body  : doc.body,
               user  :doc.user,
               createdAt  :doc.createdAt,
               updatedAt  :doc.updatedAt,
               request    : {
                  type:"GET",
                  url:"http://localhost:6700"
               }
             });
         }
         else
         {
            res.status(404).json({
               status:404,
               error:"Id to Fetch is not found"
           });
         }
       })
       .catch(error => {
         console.log(error);
         res.status(500).json({
            error:error
         });
       })
}

exports.delete_blog = (req,res,next) => {
      Blog.deleteOne({_id:req.params.deleteId})
       .exec()
       .then(result => {
         res.status(200).json({
             message:"Post has been deleted successfully",
             request: {
               type:"GET",
               url :"http://localhost:6700"
             }
         });
       })
       .catch(error => {
         console.log(error);
         res.status(500).json({
            error:error
         });
       });
}
