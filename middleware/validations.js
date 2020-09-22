const { check } = require("express-validator");

exports.registerUser = () => [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Enter Valid Email").isEmail(),
  check("password", "Password Minimum Length should be 3").isLength({ min: 3 }),
];

exports.loginUser = () => [
  check("email", "Enter Valid Email").isEmail(),
  check("password", "Password is required").exists(),
];

exports.createPost = () => [check("text", "Text is required").not().isEmpty()];

exports.createComment = () => [
  check("text", "Text is required").not().isEmpty(),
];

exports.createorUpdateProfile = () => [
  check("status", "Status is required").not().isEmpty(),
  check("skills", "Skills are required").not().isEmpty(),
];

exports.addExperience = () => [
  check("title", "Title is required").not().isEmpty(),
  check("company", "Company is required").not().isEmpty(),
  check("from", "From is required").not().isEmpty(),
];

exports.addEducation = () => [
  check("school", "School is required").not().isEmpty(),
  check("degree", "Degree is required").not().isEmpty(),
  check("fieldofstudy", "Field of Study is required").not().isEmpty(),
  check("from", "From is required").not().isEmpty(),
];
