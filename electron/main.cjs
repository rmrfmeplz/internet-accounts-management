const {app, BrowserWindow, Menu} = require('electron')

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

let mainWindow

async function createMainWindow() {
    Menu.setApplicationMenu(null)
    mainWindow = new BrowserWindow({minWidth: 1000, minHeight: 600, title: '管账易'})
    await mainWindow.loadURL('http://localhost:5173')
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.whenReady().then(async () => {
    await createMainWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})