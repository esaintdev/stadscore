
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface BlogPostCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    featuredImage: string;
    date: string;
    author: {
      name: string;
      avatar: string;
    };
    category: string;
  };
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const formattedDate = new Date(post.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={post.featuredImage} 
          alt={post.title} 
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105" 
        />
        <div className="absolute top-2 right-2 bg-stadscore text-white text-xs py-1 px-2 rounded-full">
          {post.category}
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <Link to={`/blog/${post.id}`} className="hover:text-stadscore">
          <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
        </Link>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-0">
        <div className="flex items-center gap-2">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="w-6 h-6 rounded-full" 
          />
          <span className="text-xs text-muted-foreground">{post.author.name}</span>
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {formattedDate}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
