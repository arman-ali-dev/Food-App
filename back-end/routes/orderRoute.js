const { Router } = require("express");
const router = Router();

const {
  handleAddOrders,
  handleGetAllOrders,
  handleCancelOrder,
} = require("../controllers/orderControllers");

router.post("/add", handleAddOrders);
router.get("/fetch", handleGetAllOrders);
router.delete("/cancel/:id", handleCancelOrder);

module.exports = router;
