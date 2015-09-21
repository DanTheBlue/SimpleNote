var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var fs = require('fs');
var ipc = require('ipc');
var dialog = require('dialog');
var settings = require('./settings.json');
var File = require('./file.js');
var mkdirp = require('mkdirp');



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
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});


function makeFolder(path) {
  mkdirp(path, function(err) {
    if(err) {
      console.log("Cant make folder! " + path);
      console.log(err);
      return false;
    }
  });
  return true;
}

function getSaveDirectory(file) {
  if(file.path === '') {
    file.path = app.getPath('home') + '/' + settings.directories.root + '/' + file.notebook + '/';
  }
  return file.path;
}


function getDefaultSaveDir() {
  app.getPath('home') + 'SimpleNote/';
}

//Menu options
ipc.on('save-file', function(event, file) {
  makeFolder(getSaveDirectory(file));
  fs.writeFile(getSaveDirectory(file) + file.name + file.extension, file.data);
});


ipc.on('new-file', function(event) {
  file = new File('', '', null);
  event.sender.send('recieve-file', file);
});

ipc.on('open-file', function(event) {
  dialog.showOpenDialog(function (fileNames) {
    if (fileNames === undefined) return;
    var fileName = fileNames[0];
    fs.readFile(fileName, 'utf-8', function (err, data) {
      var newFile = new File(fileName, data, null);
      event.sender.send('recieve-file', newFile);
    });
  }); 
});