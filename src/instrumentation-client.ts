if (typeof window !== "undefined") {
  window.__SYLKE_UPDATE_THEME = (theme: "light" | "dark" | "system") => {
    const classList = document.documentElement.classList;
    classList.remove("light", "dark", "system");
    classList.add(theme);
  };

  try {
    window.__SYLKE_UPDATE_THEME(
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    );
  } catch {}
}
