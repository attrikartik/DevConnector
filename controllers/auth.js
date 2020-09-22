const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { validationResult } = require("express-validator");

const User = require("../models/User");

/** Get Auth User */
exports.getUser = async (req, res) => {
  console.log(req.user.id);
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

/** Login User and return token */

exports.LoginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const token = await jwt.sign(
      { user: { id: user.id } },
      config.get("jwtSecret"),
      { expiresIn: 36000 }
    );
    if (token) {
      res.json({ token });
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};
