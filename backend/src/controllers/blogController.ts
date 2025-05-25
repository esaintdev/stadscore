import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import BlogPost, { IBlogPost } from '../models/BlogPost';
import { CustomError } from '../middleware/errorMiddleware';

// @desc    Get all blog posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const query: any = { isPublished: true };
    
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    if (req.query.tag) {
      query.tags = req.query.tag;
    }
    
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } },
        { excerpt: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .populate('author', 'name avatar')
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      BlogPost.countDocuments(query)
    ]);

    res.json({
      posts,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/posts/:slug
// @access  Public
export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug })
      .populate('author', 'name avatar')
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

// @desc    Create a new blog post
// @route   POST /api/posts
// @access  Private/Admin
export const createPost = async (req: any, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, excerpt, image, category, tags, isPublished } = req.body;
    
    const newPost = new BlogPost({
      title,
      content,
      excerpt,
      image,
      category,
      tags,
      isPublished,
      author: req.user._id,
      ...(isPublished && { publishedAt: new Date() })
    });

    const savedPost = await newPost.save();
    
    const populatedPost = await BlogPost.findById(savedPost._id)
      .populate('author', 'name avatar');

    res.status(201).json(populatedPost);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a blog post
// @route   PUT /api/posts/:id
// @access  Private/Admin
export const updatePost = async (req: any, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, excerpt, image, category, tags, isPublished } = req.body;
    
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.excerpt = excerpt || post.excerpt;
    post.image = image || post.image;
    post.category = category || post.category;
    post.tags = tags || post.tags;
    
    // Handle publish state change
    if (isPublished !== undefined) {
      post.isPublished = isPublished;
      if (isPublished && !post.publishedAt) {
        post.publishedAt = new Date();
      }
    }

    const updatedPost = await post.save();
    const populatedPost = await BlogPost.findById(updatedPost._id)
      .populate('author', 'name avatar');

    res.json(populatedPost);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ 
      message: error.message || 'Server error' 
    });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ 
      message: error.message || 'Server error' 
    });
  }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = async (req: any, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    const { text } = req.body;
    
    const newComment = {
      user: req.user._id,
      text,
      name: req.user.name,
      avatar: req.user.avatar
    };

    post.comments.unshift(newComment);
    await post.save();

    res.status(201).json(post.comments);
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
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    // Check if the post has already been liked by this user
    if (post.likes.some(like => like.toString() === req.user._id.toString())) {
      return res.status(400).json({ message: 'Post already liked' });
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
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      throw new CustomError('Post not found', 404);
    }

    // Check if the post has been liked by this user
    if (!post.likes.some(like => like.toString() === req.user._id.toString())) {
      return res.status(400).json({ message: 'Post has not yet been liked' });
    }

    // Remove the like
    post.likes = post.likes.filter(
      like => like.toString() !== req.user._id.toString()
    );

    await post.save();

    res.json(post.likes);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ 
      message: error.message || 'Server error' 
    });
  }
};
