const express = require("express");
const multer = require("multer");
const controller = require("../controller/blog");
const router = express.Router();

const storage = multer.diskStorage({
   destination:function(req,file,cb) {
      cb(null,"./public/");
   },
   filename:function(req,file,cb) {
      cb(null, file.fieldname + "_"+Date.now()+"_"+file.originalname);
   }
});

const uploads = multer({storage:storage});

 router.get("/",controller.get_all_blogs);

 router.post("/",uploads.single("blogImage"),controller.insert_new_post);

 router.get("/:blogId", controller.get_single_blog);

 router.delete("/:deleteId", controller.delete_blog);



 module.exports = router;