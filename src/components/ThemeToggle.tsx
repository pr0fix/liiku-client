// component for testing dark/light modes
const ThemeToggle = () => {
  const toggleTheme = () => {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    html.setAttribute("data-theme", current === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded">
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
