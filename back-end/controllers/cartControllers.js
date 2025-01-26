const Cart = require("../models/cartModel");

const handleAddItem = async (req, res) => {
  try {
    const userID = req._id;
    const { foodID, imageURL, name, size, qty, price } = req.body;

    const cartItemExists = await Cart.findOne({ userID, foodID, size });

    if (cartItemExists) {
      cartItemExists.quantity += +qty;
      cartItemExists.price += price;
      await cartItemExists.save();
      return res
        .status(200)
        .json({ msg: "item added in cart!", cartItem: cartItemExists });
    }

    const newItem = await Cart.create({
      userID,
      foodID,
      imageURL,
      size,
      name,
      quantity: +qty,
      price,
    });

    return res
      .status(200)
      .json({ msg: "item added in cart!", cartItem: newItem });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error!" });
  }
};

const handleGetAllCartItems = async (req, res) => {
  try {
    const userID = req._id;
    const cartItems = await Cart.find({ userID }).sort({ createdAt: -1 });
    return res.status(200).json({ cartItems });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error!" });
  }
};

const handleDeleteCartItem = async (req, res) => {
  try {
    const itemID = req.params.id;

    await Cart.findOneAndDelete({ _id: itemID });

    return res.status(200).json({ msg: "item deleted!" });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error!" });
  }
};

module.exports = { handleAddItem, handleGetAllCartItems, handleDeleteCartItem };
