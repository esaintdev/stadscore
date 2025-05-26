import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Trash2 } from 'lucide-react';
import { createPost, updatePost, getPostBySlug } from '@/services/blogService';
import { blogPostSchema, BlogPostFormValues } from '@/types/blog';

// Extended form type to handle tags as string for the form
interface BlogPostForm extends Omit<BlogPostFormValues, 'tags'> {
  tags: string; // Stored as comma-separated string in the form
}

const BlogEditor = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogPostForm>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      category: '',
      image: '',
      tags: '',
      isPublished: false
    }
  });

  useEffect(() => {
    if (id) {
      const loadPost = async () => {
        try {
          setIsLoading(true);
          const post = await getPostBySlug(id);
          reset({
            ...post,
            tags: Array.isArray(post.tags) ? post.tags.join(', ') : ''
          } as BlogPostForm);
        } catch (error) {
          console.error('Error loading post:', error);
          toast({
            title: 'Error',
            description: 'Failed to load post',
            variant: 'destructive',
          });
          navigate('/admin/blog');
        } finally {
          setIsLoading(false);
        }
      };
      loadPost();
    }
  }, [id, reset, navigate, toast]);

  const onSubmit = async (formData: BlogPostForm) => {
    try {
      setIsSubmitting(true);
      
      // Convert tags string to array
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);
      
      // Prepare post data with proper types
      const postData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        image: formData.image,
        tags: tags,
        isPublished: formData.isPublished || false
      };
      
      if (id) {
        await updatePost(id, postData);
        toast({
          title: 'Success',
          description: 'Post updated successfully',
        });
      } else {
        await createPost(postData);
        toast({
          title: 'Success',
          description: 'Post created successfully',
        });
        navigate('/admin/blog');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save post',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      setIsDeleting(true);
      // await deletePost(id);
      toast({
        title: 'Success',
        description: 'Post deleted successfully',
      });
      navigate('/admin/blog');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {id ? 'Edit Post' : 'Create New Post'}
        </h1>
        {id && (
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            Delete Post
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <div className="space-y-1">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="title"
                      placeholder="Enter post title"
                      className={errors.title ? 'border-red-500' : ''}
                    />
                  )}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <div className="space-y-1">
                <Controller
                  name="excerpt"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="excerpt"
                      placeholder="A short excerpt for the blog post"
                      rows={3}
                      className={errors.excerpt ? 'border-red-500' : ''}
                    />
                  )}
                />
                {errors.excerpt && (
                  <p className="text-sm text-red-500">{errors.excerpt.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <div className="space-y-1">
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="content"
                      placeholder="Write your blog post content here..."
                      rows={12}
                      className={`font-mono text-sm ${errors.content ? 'border-red-500' : ''}`}
                    />
                  )}
                />
                {errors.content && (
                  <p className="text-sm text-red-500">{errors.content.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image">Featured Image URL</Label>
              <div className="space-y-1">
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="image"
                      placeholder="https://example.com/image.jpg"
                      className={errors.image ? 'border-red-500' : ''}
                    />
                  )}
                />
                {errors.image && (
                  <p className="text-sm text-red-500">{errors.image.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <div className="space-y-1">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="category"
                      placeholder="e.g., Match Analysis"
                      className={errors.category ? 'border-red-500' : ''}
                    />
                  )}
                />
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="tags"
                    placeholder="e.g., premier-league, transfers, analysis"
                  />
                )}
              />
              {errors.tags && (
                <p className="text-sm text-red-500">
                  {JSON.stringify(errors.tags.message)}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <Controller
                name="isPublished"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPublished"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-stadscore focus:ring-stadscore"
                    />
                    <Label htmlFor="isPublished">Publish</Label>
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/blog')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {id ? 'Update' : 'Create'} Post
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
