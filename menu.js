var remote = require('remote');
var Menu = remote.require('menu');

var template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Save',
        accelerator: 'Command+S',
        click: function() {
          saveFile();
        }
      },
      {
        label: 'Open',
        accelerator: 'Command+O',
        click: function() {
          loadFile();
        }
      }
    ]
  },
];

menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);