import { Search, Plus, Edit, Trash2, Loader2, Eye, ChevronLeft, ChevronRight, AlertCircle, RefreshCw, FileText } from 'lucide-react';

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { getPosts, deletePost } from '@/services/blogService';
import type { BlogPost, BlogPostListResponse } from '@/types/blog';
import { format } from 'date-fns';

interface PaginationState {
  page: number;
  pages: number;
  total: number;
  limit: number;
}

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Initialize pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pages: 1,
    total: 0,
    limit: 10
  });

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: BlogPostListResponse = await getPosts(
        pagination.page, 
        pagination.limit,
        undefined, 
        undefined, 
        searchTerm
      );
      
      if (!response || !Array.isArray(response.posts)) {
        throw new Error('Invalid response format');
      }
      
      setPosts(response.posts);
      setPagination(prev => ({
        ...prev,
        page: response.page || 1,
        pages: response.pages || 1,
        total: response.total || 0
      }));
    } catch (err) {
      const error = err as Error;
      console.error('Error fetching posts:', error);
      setError('Failed to load blog posts. Please try again later.');
      toast({
        title: 'Error',
        description: error.message || 'Failed to load blog posts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [searchTerm, pagination.page, pagination.limit, toast]);

  // Fetch posts when component mounts or dependencies change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [fetchPosts]);

  const handleDelete = async (id: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(id);
      await deletePost(id);
      
      // Optimistic update: remove the post from the list
      setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
      
      // Update pagination total
      setPagination(prev => ({
        ...prev,
        total: Math.max(0, prev.total - 1)
      }));
      
      toast({
        title: 'Success',
        description: 'Post deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Draft';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      page: Math.max(1, Math.min(newPage, prev.pages))
    }));
  };

  // Handle rows per page change
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagination(prev => ({
      ...prev,
      limit: Number(e.target.value),
      page: 1 // Reset to first page
    }));
  };

  // Loading skeleton
  const renderSkeleton = () => (
    Array(5).fill(0).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell colSpan={5}>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </TableCell>
      </TableRow>
    ))
  );

  if (error && !posts.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-destructive">
          <AlertCircle className="h-12 w-12" />
        </div>
        <p className="text-lg font-medium">Something went wrong</p>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={fetchPosts} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">
            {pagination.total} {pagination.total === 1 ? 'post' : 'posts'} found
          </p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="pl-8 sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              className="h-9 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={pagination.limit}
              onChange={handleLimitChange}
              disabled={loading}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
            </select>
            <Button asChild>
              <Link to="/admin/blog/new">
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && renderSkeleton()}
            {!loading && posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-64">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                    <div className="text-center">
                      <h3 className="text-lg font-medium">No posts found</h3>
                      <p className="text-sm text-muted-foreground">
                        {searchTerm 
                          ? 'Try adjusting your search or filter to find what you\'re looking for.'
                          : 'Get started by creating a new post.'
                        }
                      </p>
                    </div>
                    <Button asChild>
                      <Link to="/admin/blog/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Post
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {post.excerpt}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-stadscore/10 text-stadscore">
                      {post.category}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      post.isPublished 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {post.isPublished ? 'Published' : 'Draft'}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(post.publishedAt || post.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/blog/edit/${post.slug}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post._id)}
                        disabled={deletingId === post._id}
                        className="text-destructive hover:text-destructive"
                      >
                        {deletingId === post._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between px-2 mt-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </span>{' '}
            of <span className="font-medium">{pagination.total}</span> posts
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1 || loading}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <div className="text-sm">
              Page {pagination.page} of {pagination.pages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages || loading}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
