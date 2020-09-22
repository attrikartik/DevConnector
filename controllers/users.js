const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { validationResult } = require("express-validator");

exports.registerUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, password, profilePicture } = req.body;

	try {
		let user = await User.findOne({ email: email });
		if (user) {
			return res.status(400).json({ errors: [{ msg: "User already Exists" }] });
		}

		const avatar = gravatar.url(email, {
			s: "200",
			r: "png",
			d: "mm",
		});

		const hashedPassword = await bcrypt.hash(password, 12);
		user = new User({
			name,
			email,
			password: hashedPassword,
			profilePicture,
		});

		await user.save();

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
