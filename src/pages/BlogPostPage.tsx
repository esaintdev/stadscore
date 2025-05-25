import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Mock blog post data - in a real app, this would come from an API
const blogPosts = {
  'top-5-football-matches': {
    id: 1,
    title: 'Top 5 Football Matches to Watch This Weekend',
    content: [
      'The football season is in full swing, and we\'ve got some exciting matches lined up for this weekend. Here are the top 5 matches you shouldn\'t miss:',
      '1. Manchester United vs Liverpool - The historic rivalry continues with both teams fighting for a top-four finish.',
      '2. Barcelona vs Real Madrid - El Clásico is always a must-watch, and this season is no different with both teams in great form.',
      '3. Bayern Munich vs Borussia Dortmund - The Der Klassiker is always full of goals and drama.',
      '4. PSG vs Marseille - The French Classique is one of the most intense rivalries in world football.',
      '5. Juventus vs AC Milan - Two Italian giants going head-to-head in a crucial match for the Serie A title race.'
    ],
    date: 'May 20, 2025',
    category: 'Football',
    readTime: '5 min read',
    author: 'John Doe',
    authorRole: 'Senior Football Analyst',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe19500c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  // Add more blog posts as needed
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6 pl-0">
        <Link to="/blog" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </Button>

      <article>
        <div className="mb-8">
          <span className="text-stadscore font-medium">{post.category}</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="prose max-w-none">
          {post.content.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-stadscore/10 flex items-center justify-center">
              <span className="text-stadscore font-bold text-xl">
                {post.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h4 className="font-medium">{post.author}</h4>
              <p className="text-sm text-muted-foreground">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
