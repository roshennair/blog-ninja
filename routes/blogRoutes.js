const express = require('express');
const blogController = require('../controllers/blogController');

// Create new router for blog routes
const router = express.Router();

router.get('/', blogController.getAllBlogs);

router.post('/', blogController.createOneBlog);

router.get('/create', blogController.getBlogCreationForm);

router.get('/:id', blogController.getOneBlog);

router.delete('/:id', blogController.deleteOneBlog);

module.exports = router;