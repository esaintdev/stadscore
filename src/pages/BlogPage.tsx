import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock blog posts data - in a real app, this would come from an API
const blogPosts = [
  {
    id: 1,
    title: 'Top 5 Football Matches to Watch This Weekend',
    excerpt: 'Check out the most exciting football matches happening this weekend across Europe.',
    date: 'May 20, 2025',
    category: 'Football',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'NBA Playoffs: Teams to Watch',
    excerpt: 'A breakdown of the top contenders in this year\'s NBA playoffs.',
    date: 'May 18, 2025',
    category: 'Basketball',
    readTime: '4 min read'
  },
  {
    id: 3,
    title: 'Tennis Grand Slam Preview',
    excerpt: 'What to expect in the upcoming Grand Slam tournament.',
    date: 'May 15, 2025',
    category: 'Tennis',
    readTime: '6 min read'
  },
];

const BlogPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Sports Blog</h1>
        <p className="text-xl text-muted-foreground">The latest news, analysis, and insights from the world of sports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-stadscore">{post.category}</span>
                <span className="text-sm text-muted-foreground">{post.date}</span>
              </div>
              <CardTitle className="text-xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{post.readTime}</span>
              <Button variant="link" className="p-0 h-auto">
                Read More →
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button size="lg" className="px-8">
          Load More Articles
        </Button>
      </div>
    </div>
  );
};

export default BlogPage;
