import { useEffect, useState } from "react";

const ThemeToggle = () => {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<button className="w-18 h-9 bg-toggle rounded-full relative" onClick={toggleTheme}>
			<span className={`absolute w-6 h-6 rounded-full bg-background top-1.5 left-1.5 ${theme === 'light' ? "" : "translate-x-9"} transition-transform duration-300 ease-in`}></span>
		</button>
	);
};

export default ThemeToggle;
