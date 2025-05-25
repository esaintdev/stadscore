
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <img 
        src="/imagesand/3e581224-b334-42cc-89b1-ea6935678777.png" 
        alt="Stadscore Logo" 
        className="h-24 w-24 mb-6" 
      />
      <h1 className="text-4xl md:text-6xl font-bold mb-4">404</h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-8">
        Oops! We couldn't find that page.
      </p>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        The page you're looking for might have been moved or doesn't exist.
      </p>
      <Button asChild size="lg">
        <Link to="/">Back to Live Scores</Link>
      </Button>
    </div>
  );
};

export default NotFound;
