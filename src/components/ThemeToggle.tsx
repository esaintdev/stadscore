
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Button className="bg-gray-700 hover:bg-gray-700" size="icon">
          <Sun className="h-5 w-5 text-white"/>
        </Button>
      ) : (
        <Button size="icon">
          <Moon className="h-5 w-5 text-white " />
        </Button>
      )}
    </Button>
  );
}
