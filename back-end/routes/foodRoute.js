const { Router } = require("express");
const router = Router();
const { handleGetAllFoods } = require("../controllers/foodControllers");

router.get("/all", handleGetAllFoods);

module.exports = router;
