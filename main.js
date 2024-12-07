const { app, BrowserWindow } = require('electron');
const path = require('path'); 
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:8100');
    win.webContents.openDevTools();  // Para desarrollo, abrimos las herramientas
  } else {
    // En producción, carga el archivo index.html desde la carpeta 'www'
    win.loadFile(path.join(__dirname, 'www', 'index.html')).catch(err => {
      console.error('Error al cargar index.html:', err);
    });
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
