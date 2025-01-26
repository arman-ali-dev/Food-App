require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const foodRoute = require("./routes/foodRoute");
const orderRoute = require("./routes/orderRoute");
const cartRoute = require("./routes/cartRoute");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const { auth } = require("./middlewares/authMiddleware");

const _dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

connectDB(process.env.MONGODB_URI)
  .then(() => console.log("Database connection succesfully!"))
  .catch(() => console.log("Database connection FAILED!"));

app.use("/api/users", userRoute);
app.use("/api/foods", foodRoute);
app.use("/api/carts", auth, cartRoute);
app.use("/api/orders", auth, orderRoute);

app.use(express.static(path.join(_dirname, "/front-end/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "front-end", "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
