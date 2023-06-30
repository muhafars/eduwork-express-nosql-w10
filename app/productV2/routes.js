const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "../../public/uploads" });
const productController = require("./controller");

router.get("/product", productController.findAll);
router.get("/product/:id", productController.findFilter);
router.post("/product", upload.single("image"), productController.storeItem);
router.put("/product/:id", upload.single("image"), productController.updateItem);
router.delete("/product/:id", productController.destroyItem);

module.exports = router;
