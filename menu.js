var remote = require('remote');
var Menu = remote.require('menu');

var template = [
  {
    label: 'File',
    submenu: [
      {
        label : "New",
        click : function() {
          newFile();
        }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: function() {
          saveFile();
        }
      },
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: function() {
          loadFile();
        }
      }
    ]
  },
];

menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);