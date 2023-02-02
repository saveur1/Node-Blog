const express = require("express");
const controller = require("../controller/blog");
 const router = express.Router();

 router.get("/",controller.get_all_blogs);

 router.post("/",controller.insert_new_post);

 router.get("/:blogId", controller.get_single_blog);

 router.delete("/:deleteId", controller.delete_blog);



 module.exports = router;