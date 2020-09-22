const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");
const config = require("config");
const { validationResult } = require("express-validator");

/** GET current user profile */

exports.getCurrentUserProfile = async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate("user", ["name", "profilePicture"]);
		if (!profile) {
			return res.status(400).json({ msg: "Profile not found" });
		}
		res.send(profile);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
};

/** POST create OR update user profile */

exports.createOrUpdateProfile = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const {
		company,
		location,
		website,
		bio,
		skills,
		status,
		githubusername,
		youtube,
		twitter,
		instagram,
		linkedin,
		facebook,
	} = req.body;

	// build profile object
	const profileFields = {};
	profileFields.user = req.user.id;
	if (company) profileFields.company = company;
	if (website) profileFields.website = website;
	if (location) profileFields.location = location;
	if (bio) profileFields.bio = bio;
	if (status) profileFields.status = status;
	if (githubusername) profileFields.githubusername = githubusername;
	if (skills) {
		profileFields.skills = skills.split(",").map((skill) => " " + skill.trim());
	}

	// Build social object
	profileFields.social = {};
	if (youtube) profileFields.social.youtube = youtube;
	if (twitter) profileFields.social.twitter = twitter;
	if (facebook) profileFields.social.facebook = facebook;
	if (instagram) profileFields.social.instagram = instagram;

	try {
		let profile = await Profile.findOne({ user: req.user.id });
		if (profile) {
			//update
			profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true }
			);
			return res.json(profile);
		}
		// create profile
		profile = new Profile(profileFields);
		await profile.save();
		res.json(profile);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
};

/** GET all profiles */

exports.getAllProfiles = async (req, res) => {
	try {
		const profiles = await Profile.find().populate("user", [
			"name",
			"profilePicture",
		]);
		res.json(profiles);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
};

/** GET profile user ID */
exports.getProfileById = async (req, res) => {
	try {
		const id = req.params.user_id;
		const profile = await Profile.findOne({ user: id }).populate("user", [
			"name",
			"profilePicture",
		]);
		if (!profile) {
			return res.status(400).json({ msg: "No Profile found" });
		}
		res.json(profile);
	} catch (error) {
		console.log(error);
		if (error.kind === "ObjectId") {
			return res.status(400).json({ msg: "No Profile found" });
		}
		res.status(500).send("Server Error");
	}
};

/** DELETE user profile */

exports.deleteUserProfile = async (req, res) => {
	try {
		// delete user posts
		await Post.deleteMany({ user: req.user.id });

		// remove profile
		await Profile.findOneAndRemove({ user: req.user.id });

		// remove user
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: "Uer Deleted" });
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
};

/** PUT profile experience */

exports.addExperience = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { title, company, location, from, to, current, description } = req.body;
	const newExp = {
		title,
		company,
		location,
		from,
		to,
		current,
		description,
	};
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		profile.experience.unshift(newExp);
		await profile.save();
		res.json({ profile });
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
};

/** DELETE any experience from user's profile */

exports.deleteExperinece = async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		// get remove index
		const removeIndex = profile.experience
			.map((exp) => exp.id)
			.indexOf(req.params.exp_id);
		profile.experience.splice(removeIndex, 1);
		await profile.save();
		res.json({ profile });
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
};

/** PUT education in user's profile */

exports.addEducation = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description,
	} = req.body;
	const newEdu = {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description,
	};
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		profile.education.unshift(newEdu);
		await profile.save();
		res.json({ profile });
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
};

/** DELETE education from user's profile */

exports.deleteEducation = async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		// get remove index
		const removeIndex = profile.education
			.map((exp) => exp.id)
			.indexOf(req.params.edu_id);
		profile.education.splice(removeIndex, 1);
		await profile.save();
		res.json({ profile });
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
};

/** GET user's repo from Github */

exports.getGithubRepos = async (req, res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/${
				req.params.username
			}/repos?per_page=5&
        sort=created:asc&client_id=${config.get(
					"githubClientId"
				)}&client_secret=
        ${config.get("githubSecret")}`,
			method: "GET",
			headers: { "user-agent": "node.js" },
		};
		request(options, (error, response, body) => {
			if (error) {
				console.log(error);
				res.status(500).send("Server Error");
			}
			if (response.statusCode !== 200) {
				return res.status(400).send({ msg: "No github profile found" });
			}
			res.json(JSON.parse(body));
		});
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
};
