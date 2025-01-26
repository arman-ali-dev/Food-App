const Food = require("../models/foodModel");

const handleGetAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();

    return res.status(200).json({ foods });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error!" });
  }
};

module.exports = { handleGetAllFoods };
