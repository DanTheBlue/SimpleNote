var ipc = require('ipc');
var path = require('path');
var File = require('./file.js');
var settings = require('./settings.json');

var currentFile;

var saveFile = function(){
	//Get the data to call the filesave
	var fileName = document.getElementById("notename").value;
	var data = document.getElementById("pad").value;
	currentFile = new File(settings.directories.save + fileName + '.md', data, null);
	
	ipc.sendSync('save-file', currentFile);
}

function loadFile() {
	ipc.sendSync('open-file');
}

function newFile() {
	ipc.sendSync('new-file');
}

ipc.on('recieve-file', function(file) {
	//Strip out the full file path to get the filename, and remove the extension
	document.getElementById("notename").value = file.name; 
	document.getElementById("pad").value = file.data;
	currentFile = file;
});