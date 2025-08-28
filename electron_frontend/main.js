const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    }
  });
  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:8080");
    win.webContents.openDevTools();
  } else {
    win.loadFile(
      path.join(__dirname, "../react_frontend/dist/index.html")
    );
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});