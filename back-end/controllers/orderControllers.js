const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const handleAddOrders = async (req, res) => {
  try {
    const userID = req._id;
    const { cartItems, totalPrice } = req.body;

    const filteredItems = cartItems.map((elem) => ({
      cartItemID: elem._id,
      name: elem.name,
      imageURL: elem.imageURL,
      size: elem.size,
      quantity: elem.quantity,
      price: elem.price,
    }));

    const newOrder = await Order.create({
      userID,
      items: filteredItems,
      totalPrice,
      date: new Date().toLocaleDateString(),
    });

    await Cart.deleteMany({ userID });

    return res
      .status(201)
      .json({ msg: "your order successfully booked!", newOrder });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error!" });
  }
};

const handleGetAllOrders = async (req, res) => {
  try {
    const userID = req._id;

    const orders = await Order.find({ userID }).sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error!" });
  }
};

const handleCancelOrder = async (req, res) => {
  try {
    const cartItemID = req.params.id;

    const order = await Order.findOne({ "items.cartItemID": cartItemID });

    const itemToRemove = order.items.find(
      (elem) => elem.cartItemID == cartItemID
    );

    order.totalPrice -= itemToRemove.price;
    await order.save();

    const updatedOrder = await Order.findOneAndUpdate(
      { "items.cartItemID": cartItemID },
      {
        $pull: { items: { cartItemID } },
        $set: { totalPrice: order.totalPrice },
      },
      { new: true }
    );

    if (updatedOrder.items.length === 0) {
      await updatedOrder.deleteOne();
    }

    return res.status(200).json({ msg: "item canceled!" });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error!" });
  }
};

module.exports = { handleAddOrders, handleGetAllOrders, handleCancelOrder };
