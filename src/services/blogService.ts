
import { useState, useEffect } from 'react';
import api from './api';

// Types
export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostListResponse {
  posts: BlogPost[];
  page: number;
  pages: number;
  total: number;
}

// API Functions
export const getPosts = async (page = 1, limit = 10, category?: string, tag?: string, search?: string) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(category && { category }),
    ...(tag && { tag }),
    ...(search && { search })
  });

  const response = await api.get<BlogPostListResponse>(`/posts?${params.toString()}`);
  return response.data;
};

export const getPostBySlug = async (slug: string) => {
  const response = await api.get<BlogPost>(`/posts/${slug}`);
  return response.data;
};

export const createPost = async (postData: {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  tags: string[];
}) => {
  const response = await api.post<BlogPost>('/posts', postData);
  return response.data;
};

export const updatePost = async (id: string, postData: {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  tags: string[];
}) => {
  const response = await api.put<BlogPost>(`/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id: string) => {
  await api.delete(`/posts/${id}`);
};

export const addComment = async (postId: string, text: string) => {
  const response = await api.post(`/posts/${postId}/comments`, { text });
  return response.data;
};

export const likePost = async (postId: string) => {
  const response = await api.put(`/posts/${postId}/like`);
  return response.data;
};

export const unlikePost = async (postId: string) => {
  const response = await api.put(`/posts/${postId}/unlike`);
  return response.data;
};

// React hooks for using the API in components
export const useBlogPosts = (page = 1, limit = 10, category?: string, tag?: string, search?: string) => {
  const [data, setData] = useState<BlogPostListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getPosts(page, limit, category, tag, search);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit, category, tag, search]);

  return { data, loading, error };
};

export const useBlogPost = (slug: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const result = await getPostBySlug(slug);
        setPost(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { post, loading, error };
};

export const useBlogPostsByCategory = (category: string) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const result = await getPosts(1, 10, category);
        setPosts(result.posts);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchPosts();
    }
  }, [category]);

  return { posts, loading, error };
};
