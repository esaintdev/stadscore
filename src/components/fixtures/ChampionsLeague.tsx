import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChampionsLeagueProps {
  title?: string;
}

const ChampionsLeague: React.FC<ChampionsLeagueProps> = ({
  title = "Champions League",
}) => {
  useEffect(() => {
    // Only add the script once
    if (!document.getElementById("scores365-script")) {
      const script = document.createElement("script");
      script.id = "scores365-script";
      script.src = "https://widgets.365scores.com/main.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <img
            src="https://a3.espncdn.com/i/leaguelogos/soccer/500-dark/2.png
"
            alt="Champions League"
            className="h-6 w-6 object-contain"
          />
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div
          data-widget-type="entityScores"
          data-entity-type="league"
          data-entity-id="572"
          data-theme="dark"
          data-lang="en"
          data-widget-id="8b9040dc-c22c-4aa1-ae44-f9960ece75ee"
        />
        <div id="powered-by">
          Powered by{" "}
          <a
            id="powered-by-link"
            href="https://www.365scores.com"
            target="_blank"
            rel="noreferrer"
          >
            365Scores.com
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChampionsLeague;
