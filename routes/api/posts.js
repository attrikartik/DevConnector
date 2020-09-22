const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const validation = require('../../middleware/validations');
const postsController = require('../../controllers/posts');
/**
 * @Route POST api/posts
 * @desc Create Post
 * @access Private
 */
router.post('/', [auth, validation.createPost()], postsController.createPost);

/**
 * @Route Get api/posts
 * @desc Get all Posts
 * @access Private
 */

router.get('/', [auth], postsController.getAllPosts);

/**
 * @Route Get api/post/:id
 * @desc Get  Post by Id
 * @access Private
 */

router.get('/:id', [auth], postsController.getPostById);

/**
 * @Route Delete api/posts/:id
 * @desc Delete  Post by Id
 * @access Private
 */

router.delete('/:id', [auth], postsController.deletPostById);

/**
 * @Route PUT api/posts/like/:id
 * @desc Like a post
 * @access Private
 */
router.put('/like/:id', [auth], postsController.likePost);


/**
 * @Route PUT api/posts/unlike/:id
 * @desc Unlike a post
 * @access Private
 */
router.put('/unlike/:id', [auth], postsController.unlikePost);

/**
 * @Route POST api/posts/comment/:id
 * @desc Create comment on a post
 * @access Private
 */
router.post('/comment/:id', [auth,validation.createComment()], postsController.createComment);


/**
 * @Route Delete api/posts/comment/:id/:comment_id
 * @desc Delete  comment on a Post
 * @access Private
 */

router.delete('/comment/:id/:comment_id', [auth], postsController.deleteComment);
module.exports = router;