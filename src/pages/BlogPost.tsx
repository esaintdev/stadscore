
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlogPost } from '@/services/blogService';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { post, loading } = useBlogPost(id || '');
  
  useEffect(() => {
    // Scroll to top when post loads
    window.scrollTo(0, 0);
  }, [post]);
  
  if (loading) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/blog" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
        <Skeleton className="h-8 w-3/4 rounded" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>
        <Skeleton className="h-72 w-full rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
          <Skeleton className="h-4 w-full rounded" />
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }
  
  const formattedDate = format(new Date(post.date), 'MMMM dd, yyyy');
  
  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/blog" className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </Button>
      
      <div className="space-y-6 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{post.title}</h1>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="h-10 w-10 rounded-full" 
            />
            <div>
              <div className="font-medium">{post.author.name}</div>
              <div className="text-sm text-muted-foreground">{formattedDate}</div>
            </div>
          </div>
          
          <div className="px-3 py-1 bg-stadscore/10 text-stadscore rounded-full text-sm">
            {post.category}
          </div>
        </div>
        
        <img 
          src={post.featuredImage} 
          alt={post.title} 
          className="w-full rounded-lg aspect-video object-cover" 
        />
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="flex flex-wrap gap-2 pt-4">
          {post.tags.map(tag => (
            <div 
              key={tag} 
              className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
            >
              #{tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
