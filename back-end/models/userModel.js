const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    next();
  } catch (error) {
    return res.status(500).json({ msg: "internal server error!" });
  }
});

userSchema.static("matchPassword", async function (email, password) {
  try {
    const user = await this.findOne({ email });

    if (!user) return null;

    const result = await bcrypt.compare(password, user.password);

    if (result) return user;
    else return { invalidPassword: true };
  } catch (error) {
    return res.status(500).json({ msg: "internal server error!" });
  }
});

userSchema.methods.generateToken = function () {
  try {
    const token = JWT.sign(
      {
        _id: this._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    return token;
  } catch (error) {
    return res.status(500).json({ msg: "internal server error!" });
  }
};
const User = mongoose.model("user", userSchema);

module.exports = User;
