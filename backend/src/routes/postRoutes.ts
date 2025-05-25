import express from 'express';
import { check } from 'express-validator';
import {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  addComment,
  likePost,
  unlikePost,
} from '../controllers/postController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .get(getPosts)
  .post(
    protect,
    admin,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('content', 'Content is required').not().isEmpty(),
      check('excerpt', 'Excerpt is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('image', 'Image URL is required').not().isEmpty(),
    ],
    createPost
  );

router.route('/:slug').get(getPostBySlug);

router
  .route('/:id')
  .put(
    protect,
    admin,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('content', 'Content is required').not().isEmpty(),
      check('excerpt', 'Excerpt is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('image', 'Image URL is required').not().isEmpty(),
    ],
    updatePost
  )
  .delete(protect, admin, deletePost);

router
  .route('/:id/comments')
  .post(
    protect,
    [check('text', 'Text is required').not().isEmpty()],
    addComment
  );

router.route('/:id/like').put(protect, likePost);
router.route('/:id/unlike').put(protect, unlikePost);

export default router;
