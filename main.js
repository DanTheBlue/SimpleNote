var express = require('express');
var app = express();
var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
var fs = require('fs');
var cheerio = require('cheerio');
var $ = cheerio.load(fs.readFileSync('index.html'));
var ipc = require('ipc');
var dialog = require('dialog');

///usr/local/lib/node_modules/electron-prebuilt/dist/electron
console.log($('#notename').val());

ipc.on('save-file', function() {
	fs.writeFile($('#notename').val() + '.md', $('#pad').text());
});

ipc.on('open-file', function() {
	dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]});
});

// Report crashes to our server.
require('crash-reporter').start();


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OSX it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1000, height: 600});

  // and load the index.html of the app.
  var file = 'file://' + __dirname + '/index.html';
  mainWindow.loadUrl(file);

  // Open the devtools.
  // mainWindow.openDevTools();


  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

