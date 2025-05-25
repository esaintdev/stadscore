import React from "react";

interface OddsWidgetProps {
  sport:
    | "football"
    | "basketball"
    | "tennis"
    | "american-football"
    | "baseball"
    | "hockey";
  height?: string;
}

const OddsWidget: React.FC<OddsWidgetProps> = ({ sport, height }) => {
  const getTitle = () => {
    switch (sport) {
      case "football":
        return "Football Betting Odds";
      case "basketball":
        return "Basketball Betting Odds";
      case "tennis":
        return "Tennis Betting Odds";
      case "american-football":
        return "American Football Betting Odds";
      case "baseball":
        return "Baseball Betting Odds";
      case "hockey":
        return "Hockey Betting Odds";
      default:
        return "Betting Odds";
    }
  };

  return (
    <div className="widget-container w-full mb-6">
      <h2 className="text-xl font-bold mb-3">{getTitle()}</h2>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg bg-secondary/20 flex items-center justify-center"
        style={{ height: height || "auto" }}
      >
        <div className="w-full">
          <iframe
            height="150"
            width="550"
            allowFullScreen
            src="http://www.oddstake.com/widgets/football-livescore-widget.php"
            style={{
              margin: 0,
              padding: 0,
              border: "none",
              outline: "none",
              verticalAlign: "baseline",
              backgroundColor: "transparent",
              overflow: "hidden",
              width: "100%",
              maxWidth: "550px",
              display: "block"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OddsWidget;
