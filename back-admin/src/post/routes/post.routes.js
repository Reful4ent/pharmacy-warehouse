const Router = require('express');
const router = new Router();
const postController = require('../controllers/post.controller');

router.post('/posts/create', postController.createPost)
router.post('/posts', postController.getPosts)
router.get('/posts/:id', postController.getOnePost)
router.put('/posts/:id', postController.updatePost)
router.delete('/posts/:id', postController.deletePost)

module.exports = router;