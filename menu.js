var remote = require('remote');
var Menu = remote.require('menu');
var ipc = require('ipc');
var template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Save',
        accelerator: 'Command+S',
        click: function() {
          ipc.sendSync('save-file');
        }
      },
      {
        label: 'Open',
        accelerator: 'Command+O',
        click: function() {
          ipc.sendSync('open-file'); 
        }
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'Command+R',
        click: function() { remote.getCurrentWindow().reload(); }
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+Command+I',
        click: function() { remote.getCurrentWindow().toggleDevTools(); }
      },
    ]
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      },
      {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }
    ]
  },
  {
    label: 'Help',
    submenu: []
  }
];

menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);