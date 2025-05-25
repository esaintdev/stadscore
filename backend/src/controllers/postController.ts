import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Post, { IPost } from '../models/Post';
import { CustomError } from '../middleware/errorMiddleware';

// @desc    Get all published posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;
    const tag = req.query.tag as string;
    const search = req.query.search as string;

    let query: any = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (tag) {
      query.tags = tag;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const posts = await Post.find(query)
      .populate('author', 'name')
      .sort({ publishedAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await Post.countDocuments(query);

    res.json({
      posts,
      page,
      pages: Math.ceil(count / limit),
      total: count,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, isPublished: true })
      .populate('author', 'name email')
      .populate('comments.user', 'name avatar');

    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    res.json(post);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ 
      message: error.message || 'Server error' 
    });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private/Admin
export const createPost = async (req: any, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, excerpt, category, image, tags } = req.body;

    const post = new Post({
      title,
      content,
      excerpt,
      category,
      image,
      tags,
      author: req.user._id,
      isPublished: true,
      publishedAt: Date.now(),
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
export const updatePost = async (req: any, res: Response) => {
  try {
    const { title, content, excerpt, category, image, tags } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.excerpt = excerpt || post.excerpt;
    post.category = category || post.category;
    post.image = image || post.image;
    post.tags = tags || post.tags;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ 
      message: error.message || 'Server error' 
    });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
export const deletePost = async (req: any, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    await Post.deleteOne({ _id: post._id });
    res.json({ message: 'Post removed' });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ 
      message: error.message || 'Server error' 
    });
  }
};

// @desc    Add a comment to a post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = async (req: any, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    const comment = {
      user: req.user._id,
      text,
      name: req.user.name,
      avatar: req.user.avatar || '',
      date: new Date()
    };

    post.comments.unshift(comment);
    await post.save();

    res.status(201).json(post.comments[0]);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ 
      message: error.message || 'Server error' 
    });
  }
};

// @desc    Like a post
// @route   PUT /api/posts/:id/like
// @access  Private
export const likePost = async (req: any, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    // Check if the post has already been liked by this user
    if (post.likes.some((like) => like.toString() === req.user._id.toString())) {
      throw new CustomError('Post already liked', 400);
    }

    post.likes.unshift(req.user._id);
    await post.save();

    res.json(post.likes);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ 
      message: error.message || 'Server error' 
    });
  }
};

// @desc    Unlike a post
// @route   PUT /api/posts/:id/unlike
// @access  Private
export const unlikePost = async (req: any, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    // Check if the post has been liked by this user
    if (!post.likes.some((like) => like.toString() === req.user._id.toString())) {
      throw new CustomError('Post has not yet been liked', 400);
    }

    // Remove the like
    post.likes = post.likes.filter(
      (like) => like.toString() !== req.user._id.toString()
    );

    await post.save();

    res.json(post.likes);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ 
      message: error.message || 'Server error' 
    });
  }
};
