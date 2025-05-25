import express from 'express';
import { protect, admin } from '../middleware/authMiddleware';
import { validateBlogPost } from '../middleware/validateBlogPost';
import {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostBySlug
} from '../controllers/blogController';

const router = express.Router();

// Admin protected routes
router.route('/')
  .get(protect, admin, getPosts) // Get all posts (including unpublished)
  .post(protect, admin, validateBlogPost, createPost);

router.route('/:id')
  .put(protect, admin, validateBlogPost, updatePost)
  .delete(protect, admin, deletePost);

router.get('/:slug', protect, admin, getPostBySlug);

export default router;
