import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "dark" | "light" | "system";

const ThemeProviderContext = createContext<Theme>("system");
const ThemeProviderSetterContext = createContext<
  ((_theme: Theme) => void) | null
>(null);

interface Props extends React.PropsWithChildren {
  defaultTheme: Theme;
  storageKey: string;
}

export const ThemeProvider: React.FC<Props> = ({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      localStorage.setItem(storageKey, systemTheme);
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);

  const setThemeHandler = useCallback(
    (t: Theme) => {
      localStorage.setItem(storageKey, t);
      setTheme(t);
    },
    [storageKey],
  );

  return (
    <ThemeProviderContext.Provider value={theme}>
      <ThemeProviderSetterContext.Provider value={setThemeHandler}>
        {children}
      </ThemeProviderSetterContext.Provider>
    </ThemeProviderContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  const setterContext = useContext(ThemeProviderSetterContext);

  if (context === undefined || setterContext === undefined) {
    throw new Error("useTheme должен использоваться с AuthProvider");
  }
  return [context, setterContext] as const;
};
