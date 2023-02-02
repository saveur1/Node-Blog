const express = require("express");
const controller = require("../controller/user");
const multer = require("multer");
const router = express.Router();

// const fileFilter = (req,file,cb) => {
//     if(file.mimetype ==="image/jpeg" || file.mimetype ==='image/png')
//     {
//         cb(null,true);
//     }
//     else
//     {
//        cb(new Error("Invalid image format"),false);
//     }
// }

const storage = multer.diskStorage({
    filename:(req,file,cb) => {
      cb(null, file.fieldname + "_" + Date.now()+ "_" +file.originalname);
    },
    destination:(req,file,cb) => {
        cb(null,"./public");
    }
});
const image = multer({storage:storage});

router.get("/",controller.get_all_users);

router.post("/", image.single("userImage"), controller.insert_new_user);

router.put("/:updateId",image.single("userImage"), controller.modify_user_info);

router.get("/:userId",controller.fetch_single_user);

router.delete("/delete/:deleteId",controller.delete_user);



module.exports = router;