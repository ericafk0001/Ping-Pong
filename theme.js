export function changeTheme(theme) {
  const settingsMenu = document.getElementById("settingsMenu");

  // Reset the settings menu background color to default (in case it was altered by previous theme)
  settingsMenu.style.backgroundColor = "";
  document.documentElement.style.setProperty("--hue", "");
  document.documentElement.style.setProperty("--saturation", "");
  document.documentElement.style.setProperty("--background-color", "");
  document.documentElement.style.setProperty("--text-color", "");
  document.documentElement.style.setProperty("--foreground-color", "");

  switch (theme) {
    case "crimson":
      document.documentElement.style.setProperty("--hue", "0");
      document.documentElement.style.setProperty("--saturation", "100%");
      document.documentElement.style.setProperty("--background-color", "black");
      document.documentElement.style.setProperty("--foreground-color", "#8a0010");
      break;
    case "paper":
      document.documentElement.style.setProperty("--hue", "0");
      document.documentElement.style.setProperty("--saturation", "0%");
      document.documentElement.style.setProperty("--background-color", "#eeeeee");
      document.documentElement.style.setProperty("--text-color", "#444444");
      document.documentElement.style.setProperty("--foreground-color", "#444444");
      break;
    case "nebula":
      document.documentElement.style.setProperty("--hue", "240");
      document.documentElement.style.setProperty("--saturation", "50%");
      document.documentElement.style.setProperty("--background-color", "#5f4b8b");
      document.documentElement.style.setProperty("--foreground-color", "hsl(240, 50%, 80%)");
      break;
    case "peach":
      document.documentElement.style.setProperty("--hue", "200");
      settingsMenu.style.backgroundColor = "rgba(194, 164, 109, 0.7)";
      document.documentElement.style.setProperty("--background-color", "#FFE5B4");
      document.documentElement.style.setProperty("--foreground-color", "hsl(43 85% 74%)");
      break;
    case "pastel":
      document.documentElement.style.setProperty("--saturation", "0%");
      document.documentElement.style.setProperty("--hue", "300");
      document.documentElement.style.setProperty("--background-color", "pink");
      document.documentElement.style.setProperty("--foreground-color", "hsl(342 72% 74%)");
      break;
    case "dark":
      document.documentElement.style.setProperty("--hue", "0");
      document.documentElement.style.setProperty("--saturation", "0%");
      document.documentElement.style.setProperty("--text-color", "white");
      document.documentElement.style.setProperty("--foreground-color", "hsl(0, 0%, 80%)");
      break;
  }
}
