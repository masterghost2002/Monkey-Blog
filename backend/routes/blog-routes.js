const express = require('express');
const router = express.Router();
const {getAllBlogs, addBlog, updateBlog, getById, deleteBlog, getByUserId} = require('../controllers/blog-controller');
const {verify_access_token} = require('../middleware/auth_jwt');
router.get('/user',verify_access_token, getByUserId);
router.get('/', verify_access_token, getAllBlogs);
router.get('/:id', getById);// get by id dosn't require authentication (to share with third person)
router.post('/add',verify_access_token, addBlog);
router.put('/update/:id',verify_access_token, updateBlog);
router.delete('/:id',verify_access_token, deleteBlog);
module.exports = router;