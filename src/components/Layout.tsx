import { useEffect, type FC, type ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
  showThemeToggle?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, showThemeToggle = true }) => {
  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      {showThemeToggle && (
        <div className="fixed top-5 right-5 z-[1001]">
          <ThemeToggle />
        </div>
      )}
      {children}
    </>
  );
};

export default Layout;
