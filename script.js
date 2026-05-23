async function loadApp() {
  while (typeof ts === "undefined") {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  try {
    const response = await fetch("app.ts");

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const tsCode = await response.text();

    const jsCode = ts.transpile(tsCode, {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.None,
    });

    const script = document.createElement("script");
    script.textContent = jsCode;
    document.body.appendChild(script);
  } catch (error) {
    console.error("Failed to load or transpile app.ts:", error);

    const container = document.getElementById("app-container");

    if (container)
      container.innerHTML = `<div class="text-red-500 text-center p-4">Error: Could not load the game logic. Please check the console for details.</div>`;
  }
}

document.addEventListener("DOMContentLoaded", loadApp);
