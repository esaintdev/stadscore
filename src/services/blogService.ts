
import { useState, useEffect } from 'react';

// Types
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
}

// Mock data for blog posts
const mockBlogPosts: BlogPost[] = [
  {
    id: 'top-transfers-2025',
    title: 'Top 10 Football Transfers to Watch in 2025',
    content: `
      <p>The football transfer market continues to evolve, with clubs worldwide competing for the best talent. As we approach the 2025 transfer window, several high-profile moves are already being discussed in football circles.</p>
      
      <h2>1. Kylian Mbappé's Next Move</h2>
      <p>After his time at Real Madrid, rumors suggest Mbappé might be looking for a new challenge. Premier League clubs are reportedly preparing record-breaking offers to bring the French superstar to England.</p>
      
      <h2>2. The Next Generation</h2>
      <p>Young talents like Youssoufa Moukoko and Gavi are expected to command enormous fees as they enter their prime years. Barcelona is working hard to retain their stars, but economic pressures may force difficult decisions.</p>
      
      <h2>3. Premier League's Spending Power</h2>
      <p>English clubs continue to dominate the transfer market with their financial muscle. Manchester City and Chelsea are reportedly planning major squad overhauls, with budgets exceeding €300 million each.</p>
      
      <h2>4. Serie A Renaissance</h2>
      <p>Italian clubs are making a comeback in the transfer market. Inter Milan and Juventus have secured new investment and are ready to challenge for top players once again.</p>
      
      <h2>Conclusion</h2>
      <p>The 2025 transfer window promises to be one of the most exciting in recent memory. With financial regulations evolving and new ownership models emerging, we may see unprecedented movement of players between clubs and leagues.</p>
    `,
    excerpt: "As we approach the 2025 transfer window, several high-profile moves are already being discussed. Here's our analysis of the top transfers to watch and their potential impact on the football landscape.",
    featuredImage: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '2023-05-10T09:00:00Z',
    author: {
      name: 'Michael Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    category: 'Transfers',
    tags: ['transfers', 'premier league', 'la liga', 'mbappé']
  },
  {
    id: 'tactical-trends-2025',
    title: 'Emerging Tactical Trends in Modern Football',
    content: `
      <p>Football tactics are constantly evolving, with coaches innovating to gain competitive advantages. Several interesting tactical trends have emerged recently that are reshaping how the game is played at the highest level.</p>
      
      <h2>The Return of the Back Three</h2>
      <p>After years of dominance by the 4-3-3 formation, many top teams are switching to variations of the back three. This provides more defensive solidity while allowing wing-backs to contribute to attacks.</p>
      
      <h2>Inverted Full-backs</h2>
      <p>Pioneered by Pep Guardiola, the concept of full-backs moving into central midfield positions when in possession has spread throughout elite football. This creates numerical advantages in midfield and helps teams control games.</p>
      
      <h2>Pressing Intensity</h2>
      <p>Data analysis shows that pressing intensity has increased by 23% over the last five years in top European leagues. Teams are now defending from the front more aggressively than ever before.</p>
      
      <h2>Positional Fluidity</h2>
      <p>The strict positional play of previous eras is giving way to more fluid approaches where players regularly exchange positions during matches. This makes teams harder to defend against and creates confusion for opponents.</p>
      
      <h2>Conclusion</h2>
      <p>These tactical innovations are making football more dynamic and unpredictable. Coaches who can successfully implement these ideas—while developing counter-strategies against them—will likely enjoy success in the coming seasons.</p>
    `,
    excerpt: 'Football tactics never stand still. From inverted full-backs to new pressing systems, we analyze the latest tactical innovations transforming the modern game.',
    featuredImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '2023-04-28T14:30:00Z',
    author: {
      name: 'Sophia Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    category: 'Analysis',
    tags: ['tactics', 'coaching', 'analysis']
  },
  {
    id: 'betting-strategies-football',
    title: 'Advanced Betting Strategies for Football: Beyond Basic Wagers',
    content: `
      <p>Football betting has evolved far beyond simply picking a winner. Today's sophisticated bettors use statistical models, situational analysis, and specialized bet types to find value in the markets.</p>
      
      <h2>Expected Goals (xG) Betting</h2>
      <p>The xG metric has revolutionized football analysis, and smart bettors are incorporating it into their strategies. Looking for discrepancies between a team's actual goals and xG can identify teams likely to improve or decline in upcoming matches.</p>
      
      <h2>Live Betting Opportunities</h2>
      <p>In-play betting offers unique opportunities for value when you can react to game events faster than bookmakers adjust their odds. Monitoring momentum shifts, tactical changes, and player performances can give you an edge.</p>
      
      <h2>Specialized Markets</h2>
      <p>Beyond the basic match result markets, corners, cards, and player props often offer better value. These markets are typically less efficient because bookmakers focus their sharpest models on the main markets.</p>
      
      <h2>Bankroll Management</h2>
      <p>Even the best betting strategy will fail without proper bankroll management. Professional bettors typically risk only 1-5% of their bankroll on a single wager and adjust their stake based on their confidence level.</p>
      
      <h2>Conclusion</h2>
      <p>Successful football betting requires discipline, research, and a methodical approach. By incorporating advanced metrics and focusing on specialized markets, bettors can find edges even in today's highly efficient betting markets.</p>
    `,
    excerpt: 'Discover advanced betting approaches that go beyond basic match predictions. Learn how to use statistical models and specialized markets to find value in football betting.',
    featuredImage: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '2023-04-15T10:45:00Z',
    author: {
      name: 'Daniel Williams',
      avatar: 'https://randomuser.me/api/portraits/men/57.jpg'
    },
    category: 'Betting',
    tags: ['betting', 'odds', 'strategy']
  },
  {
    id: 'african-football-rise',
    title: 'The Rise of African Football: New Powerhouses Emerging',
    content: `
      <p>African football continues to grow in stature and influence on the world stage. With improved infrastructure, investment, and coaching, several nations are emerging as serious contenders in international competitions.</p>
      
      <h2>Senegal's Golden Generation</h2>
      <p>After their AFCON triumph and World Cup success, Senegal has established themselves as Africa's top team. Their player development system is now producing talents for top European clubs on a regular basis.</p>
      
      <h2>Morocco's Project</h2>
      <p>Morocco's historic World Cup semifinal run was no accident. It was the result of a decade-long project involving coaching education, youth academies, and infrastructure development. They've created a sustainable model other nations are now studying.</p>
      
      <h2>Nigeria's Domestic Renaissance</h2>
      <p>The Nigerian Professional Football League has seen significant investment and is now retaining more talented players. This stronger domestic foundation is expected to benefit the national team in coming years.</p>
      
      <h2>Youth Development Success</h2>
      <p>African nations have dominated youth tournaments in recent years, with Ghana, Nigeria, and Senegal all reaching finals. This points to a bright future as these players mature into senior internationals.</p>
      
      <h2>Conclusion</h2>
      <p>African football is entering an exciting era with multiple nations capable of challenging traditional powers. The continent's wealth of talent, combined with improved organization and coaching, suggests we'll see an African team lifting the World Cup in the not-too-distant future.</p>
    `,
    excerpt: 'African football is rising on the world stage with nations like Senegal, Morocco, and Nigeria investing in infrastructure and youth development. We examine the factors behind this growth.',
    featuredImage: 'https://images.unsplash.com/photo-1493964359613-a3e69185c236?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '2023-03-22T08:15:00Z',
    author: {
      name: 'Amara Okafor',
      avatar: 'https://randomuser.me/api/portraits/women/19.jpg'
    },
    category: 'International',
    tags: ['africa', 'senegal', 'morocco', 'nigeria']
  },
  {
    id: 'football-analytics-revolution',
    title: 'How Data Analytics is Revolutionizing Football Scouting',
    content: `
      <p>The days of scouting players solely through the eye test are long gone. Today's football clubs are employing sophisticated data analytics to identify talent, predict performance, and gain competitive advantages.</p>
      
      <h2>Beyond Traditional Metrics</h2>
      <p>Advanced metrics like progressive passes, expected threat (xT), and pressure success rate provide much deeper insights than goals and assists. These metrics help clubs identify players who contribute significantly even when not directly involved in scoring.</p>
      
      <h2>Machine Learning Models</h2>
      <p>Top clubs are now using machine learning algorithms to predict player development trajectories. By analyzing thousands of career paths, these models can identify patterns that suggest which young players are most likely to reach elite levels.</p>
      
      <h2>Physical Performance Data</h2>
      <p>GPS tracking and biometric data collection have transformed how clubs monitor player workloads and injury risks. This allows for personalized training programs and more scientific approaches to player development.</p>
      
      <h2>Finding Market Inefficiencies</h2>
      <p>Smart clubs use data to identify undervalued players in less scouted leagues. This "Moneyball" approach has helped teams like Brentford and Brighton compete with wealthier rivals despite smaller budgets.</p>
      
      <h2>Conclusion</h2>
      <p>Data analytics is now an essential part of football operations at all levels. Clubs that effectively integrate data-driven approaches with traditional scouting methods gain significant advantages in the transfer market and on the pitch.</p>
    `,
    excerpt: 'Modern football clubs are embracing sophisticated data analytics to transform their scouting processes. Learn how AI, machine learning, and advanced metrics are changing how teams discover talent.',
    featuredImage: 'https://images.unsplash.com/photo-1590581096959-4838195627b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '2023-03-10T16:20:00Z',
    author: {
      name: 'Thomas Chen',
      avatar: 'https://randomuser.me/api/portraits/men/81.jpg'
    },
    category: 'Technology',
    tags: ['analytics', 'scouting', 'data', 'technology']
  }
];

// Exported hooks and functions
export const useBlogPosts = (limit?: number) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filteredPosts = [...mockBlogPosts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      if (limit) {
        filteredPosts = filteredPosts.slice(0, limit);
      }
      
      setPosts(filteredPosts);
      setLoading(false);
    }, 800);
  }, [limit]);
  
  return { posts, loading };
};

export const useBlogPost = (postId: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundPost = mockBlogPosts.find(p => p.id === postId) || null;
      setPost(foundPost);
      setLoading(false);
    }, 600);
  }, [postId]);
  
  return { post, loading };
};

export const useBlogPostsByCategory = (category: string) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const filteredPosts = mockBlogPosts
        .filter(post => post.category.toLowerCase() === category.toLowerCase())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setPosts(filteredPosts);
      setLoading(false);
    }, 800);
  }, [category]);
  
  return { posts, loading };
};
