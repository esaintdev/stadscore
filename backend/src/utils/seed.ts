import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Post, { IPost } from '../models/Post';
import connectDB from '../config/db';

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin' as const,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456',
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: '123456',
  },
];

const posts = [
  {
    title: 'Welcome to Stadscore Blog',
    content: 'This is the first post on our new blog. Stay tuned for more updates!',
    excerpt: 'Introduction to our new blog platform',
    category: 'Announcements',
    image: 'https://via.placeholder.com/800x400',
    tags: ['welcome', 'announcement'],
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    title: 'Getting Started with Stadscore',
    content: 'Learn how to get started with Stadscore and make the most of its features.',
    excerpt: 'A beginner\'s guide to Stadscore',
    category: 'Tutorials',
    image: 'https://via.placeholder.com/800x400',
    tags: ['tutorial', 'beginners'],
    isPublished: true,
    publishedAt: new Date(),
  },
  {
    title: 'Advanced Features Coming Soon',
    content: 'We are working on some exciting new features for Stadscore. Stay tuned!',
    excerpt: 'Preview of upcoming features',
    category: 'Updates',
    image: 'https://via.placeholder.com/800x400',
    tags: ['updates', 'features'],
    isPublished: false,
  },
];

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    
    // Create users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Add author to posts and ensure required fields are present
    const samplePosts = posts.map((post) => ({
      ...post,
      author: adminUser,
      slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      comments: [],
      likes: [],
    })) as unknown as IPost[];

    // Insert posts
    await Post.insertMany(samplePosts);

    console.log('Data imported!');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Post.deleteMany({});

    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

// Handle command line arguments
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
