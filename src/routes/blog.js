const express = require("express");
const multer = require("multer");
const fs = require("fs");
const CheckAuth = require("../middleware/Authantication");
const controller = require("../controller/blog");

const router = express.Router();

const fileFilter =(req,file,cb) =>{
   let path="./public/"+file.filename;
   if(fs.existsSync(path))
   {
      cb(null,false);
   }
   else {
      cb(null,true);
   }
}
const storage = multer.diskStorage({
   destination:function(req,file,cb) {
      cb(null,"./public/");
   },
   filename:function(req,file,cb) {
      cb(null, file.fieldname + "_" +file.originalname);
   }
});

const uploads = multer({storage:storage,fileFilter:fileFilter});

 router.get("/",controller.get_all_blogs);

 router.post("/create",uploads.single("blogImage"),controller.insert_new_post);

 router.delete("/delete/:deleteId", controller.delete_blog);

 router.get("/:blogId", controller.get_single_blog);

 router.put("/update/:edit_id",uploads.single("blogImage"),controller.edit_blog_data);



 module.exports = router;