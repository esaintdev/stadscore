
import React from 'react';

const About = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">About Stadscore</h1>
      
      <div className="flex items-center justify-center py-6">
        <img 
          src="/imagesand/bd54bfe1-8a85-4f9d-bb70-3d74ba96890f.png" 
          alt="Stadscore Logo Full" 
          className="h-auto max-w-full" 
        />
      </div>
      
      <p className="text-lg">
        Welcome to Stadscore, your ultimate destination for real-time football scores, stats, and betting odds.
      </p>
      
      <h2 className="text-2xl font-semibold">Our Mission</h2>
      <p>
        At Stadscore, we're passionate about bringing you the most accurate, comprehensive, and user-friendly football data experience. Whether you're a casual fan checking scores on the go or a dedicated punter comparing odds for your next bet, our platform is designed to meet all your football information needs.
      </p>
      
      <h2 className="text-2xl font-semibold">What We Offer</h2>
      <div className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Live Scores</h3>
          <p>Follow matches in real-time with up-to-the-minute score updates, match events, and statistics from leagues around the world.</p>
        </div>
        
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Fixtures & Results</h3>
          <p>Never miss a game with our comprehensive fixtures list, and catch up on recent results with detailed match reports and statistics.</p>
        </div>
        
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">League Tables</h3>
          <p>Stay updated with the latest standings for all major leagues, complete with form guides, goal differences, and team performance data.</p>
        </div>
        
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Odds Comparison</h3>
          <p>Compare betting odds from leading bookmakers to find the best value for your wagers, with real-time updates and market movement tracking.</p>
        </div>
        
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Expert Analysis</h3>
          <p>Enhance your football knowledge with our blog featuring match previews, tactical analysis, betting insights, and more from our team of experts.</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold pt-4">Our Commitment</h2>
      <p>
        We're committed to providing a fast, reliable, and intuitive platform that works seamlessly across all devices. Our mobile-first approach ensures you can access critical football information whether you're at home or on the move.
      </p>
      <p className="mt-4">
        Thank you for choosing Stadscore as your football companion. We're constantly improving our service based on user feedback, so please don't hesitate to contact us with any suggestions or questions.
      </p>
      
      <div className="border-t pt-6 mt-8">
        <p className="text-center text-muted-foreground">
          Stadscore — Track every score
        </p>
      </div>
    </div>
  );
};

export default About;
