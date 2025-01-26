const User = require("../models/userModel");

const handleUserSignUp = async (req, res) => {
  try {
    const { name, email, location, password } = req.body;

    if (!name || !email || !location || !password) {
      return res.status(400).json({ msg: "all fields are required!" });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: "User is already exists!" });
    }

    if (password.length < 5) {
      return res.status(400).json({ msg: "password must be 5 digit!" });
    }

    const user = await User.create({
      name,
      email,
      location,
      password,
    });

    const token = user.generateToken();

    return res
      .cookie("token", token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(201)
      .json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      });
  } catch (error) {
    res.status(500).json({ msg: "internal server error!" });
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "all fields are required!" });
    }

    const user = await User.matchPassword(email, password);

    if (!user) {
      return res.status(401).json({ msg: "user doesn't exists!" });
    }

    if (user.invalidPassword) {
      return res.status(401).json({ msg: "invalid password!" });
    }
    const token = user.generateToken();

    return res
      .cookie("token", token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error!" });
  }
};

const handleLogout = (_, res) => {
  try {
    return res.clearCookie("token").status(200).json({ msg: "user logout!" });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error!" });
  }
};

const handleGetProfile = async (req, res) => {
  try {
    const user = await User.findById(req._id).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error!" });
  }
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleLogout,
  handleGetProfile,
};
