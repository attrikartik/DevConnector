const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const validation = require('../../middleware/validations');

const profileController = require('../../controllers/profile');
/**
 * @Route GET api/profile/me
 * @desc  get current user profile
 * @access private
 */
router.get('/me', auth, profileController.getCurrentUserProfile);

/**
 *  @Route POST api/profile
 *  @desc  Create or update profile
 *  @access PRIVATE
 */
router.post('/', [auth, validation.createorUpdateProfile()], profileController.createOrUpdateProfile);


/**
 *  @Route GET api/profile
 *  @desc  Get all profiles
 *  @access PUBLIC
 */
router.get('/', profileController.getAllProfiles);

/**
 *  @Route GET api/profile/user/user_id
 *  @desc  Get profile by userId
 *  @access PUBLIC
 */
router.get('/user/:user_id', profileController.getProfileById);

/**
 *  @Route DELETE api/profile
 *  @desc  delete profile, user, posts
 *  @access PRIVATE
 */
router.delete('/', auth, profileController.deleteUserProfile);


/**
 *  @Route PUT api/profile/experience
 *  @desc  add profile experience
 *  @access PRIVATE
 */
router.put('/experience', [auth, validation.addExperience()], profileController.addExperience);

/**
 *  @Route Delete api/profile/experience/:exp_id
 *  @desc  delete profile experience
 *  @access PRIVATE
 */
router.delete('/experience/:exp_id', [auth], profileController.deleteExperinece );

/**
 *  @Route PUT api/profile/education
 *  @desc  add profile education
 *  @access PRIVATE
 */
router.put('/education', [auth,validation.addEducation()], profileController.addEducation);

/**
*  @Route Delete api/profile/education/:edu_id
*  @desc  delete profile education
*  @access PRIVATE
*/
router.delete('/education/:edu_id', [auth], profileController.deleteEducation);

/**
*  @Route GEt api/profile/github/:username
*  @desc  get user's repos from github
*  @access PUBLIC
*/
router.get('/github/:username', profileController.getGithubRepos);
module.exports = router;