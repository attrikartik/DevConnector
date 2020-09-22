const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");
const { validationResult } = require("express-validator");

/** create post */
exports.createPost = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const user = await User.findById(req.user.id).select("-password");
		const newPost = new Post({
			text: req.body.text,
			name: user.name,
			profilePicture: user.profilePicture,
			user: req.user.id,
		});

		const post = await newPost.save();
		res.json(post);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
};

/** GET all posts */

exports.getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
};

/** GET Post By id */

exports.getPostById = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(400).send({ msg: "Post not found" });
		}
		res.json(post);
	} catch (error) {
		console.log(error);
		if (error.kind === "ObjectId") {
			return res.status(400).send({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
};

/** DELETE Post By Id */

exports.deletPostById = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(400).send({ msg: "Post not found" });
		}
		// check user
		if (post.user.toString() !== req.user.id) {
			return res.status(401).send({ msg: "User not authorized" });
		}
		await post.remove();
		res.json({ msg: "Post removed" });
	} catch (error) {
		console.log(error);
		if (error.kind === "ObjectId") {
			return res.status(400).send({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
};

/** PUT likes for a post */

exports.likePost = async (req, res) => {
	try {
		const id = req.params.id;
		const post = await Post.findById(id);
		if (!post) {
			return res.status(400).send({ msg: "Post not found" });
		}

		// check if post has already been liked
		let like = post.likes.filter(
			(like) => like.user.toString() === req.user.id
		);
		if (like.length > 0) {
			return res.status(400).send({ msg: "Post already liked" });
		}
		post.likes.unshift({ user: req.user.id });
		await post.save();
		res.json(post.likes);
	} catch (error) {
		console.log(error);
		if (error.kind === "ObjectId") {
			return res.status(400).send({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
};

/** PUT Unlike post */

exports.unlikePost = async (req, res) => {
	try {
		const id = req.params.id;
		const post = await Post.findById(id);
		if (!post) {
			return res.status(400).send({ msg: "Post not found" });
		}

		// check if post has already been liked
		let like = post.likes.filter(
			(like) => like.user.toString() === req.user.id
		);
		if (like.length === 0) {
			return res.status(400).send({ msg: "Post not liked Yet" });
		}
		// get removeIndex
		const removeIndex = post.likes
			.map((like) => like.user.toString())
			.indexOf(req.user.id);
		post.likes.splice(removeIndex, 1);
		await post.save();
		res.json(post.likes);
	} catch (error) {
		console.log(error);
		if (error.kind === "ObjectId") {
			return res.status(400).send({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
};

/** Create comment a post */

exports.createComment = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const user = await User.findById(req.user.id).select("-password");
		const post = await Post.findById(req.params.id);

		const newComment = {
			text: req.body.text,
			name: user.name,
			profilePicture: user.profilePicture,
			user: req.user.id,
		};
		post.comments.unshift(newComment);
		await post.save();
		res.json(post.comments);
	} catch (error) {
		console.log(error);
		if (error.kind === "ObjectId") {
			return res.status(400).send({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
};

/** DELETE a comment on a particular post */

exports.deleteComment = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(400).send({ msg: "Post not found" });
		}

		// PULL out comments
		const comment = post.comments.find(
			(comment) => comment.id.toString() === req.params.comment_id
		);

		// check user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).send({ msg: "User not authorized" });
		}

		// get removeIndex
		const removeIndex = post.comments
			.map((comment) => comment.user.toString())
			.indexOf(req.user.id);
		post.comments.splice(removeIndex, 1);
		await post.save();
		res.json(post.comments);
	} catch (error) {
		console.log(error);
		if (error.kind === "ObjectId") {
			return res.status(400).send({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
};
