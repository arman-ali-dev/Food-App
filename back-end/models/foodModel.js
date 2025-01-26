const { Schema, model } = require("mongoose");

const foodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      half: { type: Number },
      full: { type: Number },
      regular: { type: Number },
      medium: { type: Number },
      large: { type: Number },
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Food = model("foodItems", foodSchema);

module.exports = Food;
