const { Router } = require("express");
const router = Router();
const {
  handleAddItem,
  handleGetAllCartItems,
  handleDeleteCartItem,
} = require("../controllers/cartControllers");

router.post("/add", handleAddItem);
router.get("/fetch", handleGetAllCartItems);
router.delete("/delete/:id", handleDeleteCartItem);

module.exports = router;
