export const THEME_INIT_SCRIPT = `(function () {
  try {
    if (localStorage.getItem("app.theme") === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.style.colorScheme = "light";
    }
  } catch (_) {}
})();`;
