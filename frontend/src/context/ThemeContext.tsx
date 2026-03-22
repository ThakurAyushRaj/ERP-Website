import React, { createContext, useContext, useState, useEffect } from "react";
import { getStoredTheme, saveTheme } from "../utils/theme";
import type { ThemeKey } from "../utils/theme";

interface ThemeContextType {
  theme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<ThemeKey>("default");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setThemeState(getStoredTheme());
    setIsLoaded(true);
  }, []);

  const setTheme = (newTheme: ThemeKey) => {
    setThemeState(newTheme);
    saveTheme(newTheme);
  };

  if (!isLoaded) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
