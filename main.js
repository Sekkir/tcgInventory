const path = require('path');
const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,  // Desactiva el aislamiento del contexto
      allowRunningInsecureContent: true  // Permite cargar contenido no seguro si es necesario
    },
  });

  // Verifica la ruta completa del archivo index.html
  const indexPath = path.join(__dirname, 'www', 'index.html');
  console.log('Cargando archivo:', indexPath);

  win.loadFile(indexPath).catch(err => {
    console.error('Error al cargar index.html:', err);
  });

  // Abre las herramientas de desarrollo
  win.webContents.openDevTools();
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
