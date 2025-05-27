import React from "react";
import WidgetContainer from "@/components/widgets/WidgetContainer";
import ResultWidget from "@/components/widgets/ResultWidget";


const Result = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight">Results</h1>

      <div className="text-sm text-muted-foreground mb-4">
        Get the latest result from around the world.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <ResultWidget />
      </div>
    </div>
  );
};

export default Result;
