import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { validateComment } from '../middleware/validateBlogPost';
import {
  getPosts,
  getPostBySlug,
  addComment,
  likePost,
  unlikePost
} from '../controllers/blogController';

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/:slug', getPostBySlug);

// Protected routes
router.post('/:id/comments', protect, validateComment, addComment);
router.put('/:id/like', protect, likePost);
router.put('/:id/unlike', protect, unlikePost);

export default router;
