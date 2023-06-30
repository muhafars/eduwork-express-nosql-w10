const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "../../public/uploads" });
const productController = require("./controller");

router.get("/product", productController.index);
router.get("/product/:id", productController.filterView);
router.post("/product", upload.single("image"), productController.storeView);
router.put("/product/:id", upload.single("image"), productController.updateView);
router.delete("/product/:id", productController.destroyView);

module.exports = router;
