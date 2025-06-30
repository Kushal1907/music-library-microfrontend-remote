// C:\Users\Asus\OneDrive\Desktop\New folder\music-library-app\src\main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

function renderMusicLibrary(elementId, initialProps = {}) {
  // Accept initialProps
  const root = createRoot(document.getElementById(elementId));
  root.render(
    <React.StrictMode>
      <App {...initialProps} /> {/* Pass initialProps to App */}
    </React.StrictMode>
  );
}

// Expose the function globally
window.renderMusicLibrary = renderMusicLibrary;

// Optional: If you want to run this app independently for development
if (
  import.meta.env.DEV &&
  !document.getElementById("music-library-container")
) {
  const devRoot = document.createElement("div");
  devRoot.id = "music-library-standalone-root";
  document.body.appendChild(devRoot);
  // Call renderMusicLibrary with empty props for standalone mode
  renderMusicLibrary("music-library-standalone-root", {});
}
