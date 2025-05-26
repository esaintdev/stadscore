import { z } from 'zod';

export const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  excerpt: z.string().min(20, 'Excerpt must be at least 20 characters'),
  content: z.string().min(100, 'Content must be at least 100 characters'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Please enter a valid URL'),
  tags: z.string().transform(val => 
    val.split(',').map(tag => tag.trim()).filter(Boolean)
  ),
  isPublished: z.boolean().default(false)
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;

export interface BlogPost extends Omit<BlogPostFormValues, 'tags'> {
  _id: string;
  slug: string;
  tags: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  comments: Array<{
    _id: string;
    user: {
      _id: string;
      name: string;
      avatar?: string;
    };
    text: string;
    date: string;
  }>;
  likes: string[];
}

export interface BlogPostListResponse {
  posts: BlogPost[];
  page: number;
  pages: number;
  total: number;
}
