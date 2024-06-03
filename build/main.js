const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    title: "tableapp",
    frame: true,
    icon: path.join(__dirname,"App_Logo.png"),
    width: 900,
    height: 700,
    minWidth: 700,
    minHeight: 500,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      // worldSafeExecuteJavaScript: true, // Corrected option name
      // contextIsolation: true, // Enable context isolation
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Condition to determine whether to load from local file or remote URL
  const isLocal = true; // Set this to false if you want to load from a local file

  if (isLocal) {
    // Load the index.html from a local file
    win.removeMenu();
    win.loadFile(path.join(__dirname, "..", "build", "index.html"));
  } else {
    // Load the index.html from a remote URL
    win.loadURL("http://localhost:3000");
  }

  // Open the DevTools.
  // win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
