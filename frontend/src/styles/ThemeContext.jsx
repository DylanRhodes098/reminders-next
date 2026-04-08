import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

const STORAGE_KEY = "reminders-theme";

const ThemeContext = createContext({
  isDark: false,
  setIsDark: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDarkState] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    const dark = stored === "dark";
    document.documentElement.classList.toggle("dark", dark);
    return dark;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  const setIsDark = (value) => setIsDarkState(!!value);
  const toggleTheme = () => setIsDarkState((d) => !d);

  const value = useMemo(
    () => ({ isDark, setIsDark, toggleTheme }),
    [isDark]
  );

  // Menu colors for SideNav + SideNav2 (every `<Menu />` under this provider).
  // Edit the objects below; tokens: https://ant.design/components/menu#design-token
  const antdThemeConfig = useMemo(() => {
    const menuTokens = isDark
      ? {
          itemBg: "#1a1a1a",
          subMenuItemBg: "#1a1a1a",
          menuSubMenuBg: "#1a1a1a",
          popupBg: "#262626",
          itemHoverBg: "#2a2a2a",
          itemActiveBg: "#333333",
          itemSelectedBg: "#111b26",
        }
      : {
          itemBg: "#f3f4f6",
          subMenuItemBg: "#f3f4f6",
          menuSubMenuBg: "#f3f4f6",
          popupBg: "#f3f4f6",
          itemHoverBg: "#e5e7eb",
          itemActiveBg: "#d1d5db",
          itemSelectedBg: "#d8f9ff",
        };

    return {
      algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      components: {
        Menu: menuTokens,
      },
    };
  }, [isDark]);

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
