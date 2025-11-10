// Theme override via query param
document.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	const theme = urlParams.get("preferred-color-scheme");
	if (theme && ["light", "dark", "auto"].includes(theme)) {
		// Set localStorage for persistence
		const storageKey = "starlight-theme";
		if (typeof localStorage !== "undefined") {
			localStorage.setItem(
				storageKey,
				theme === "light" || theme === "dark" ? theme : "",
			);
		}

		// Set data-theme attribute
		const resolvedTheme =
			theme === "auto"
				? matchMedia("(prefers-color-scheme: light)").matches
					? "light"
					: "dark"
				: theme;
		document.documentElement.setAttribute("data-theme", resolvedTheme);

		// Update theme selector UI
		const themeProvider = (window as any).StarlightThemeProvider;
		if (themeProvider) {
			themeProvider.updatePickers(theme);
		}
	}
});
