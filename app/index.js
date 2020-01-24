const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const db = require("./js/DB.js").db;
const path = require("path");
const ipc = require('electron').ipcRenderer;

let loaded_project_name = '';

ipc.on('messageFromMain', (event, message) => {
    console.log(message)
    loaded_project_name = message;
    if (loaded_project_name != null) {
        win.webContents.send('main_reply_from_renderer', '200')
    } else {
        win.webContents.send('main_reply_from_renderer', '400')
    }
});