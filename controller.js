var ipc = require('ipc');
var path = require('path');

var saveFile = function(){
	//Get the data to call the filesave
	var file = {
		fileName : document.getElementById("notename").value,
		data : document.getElementById("pad").value
	}
	ipc.sendSync('save-file', file);
}

function loadFile() {
	ipc.sendSync('open-file');
}

ipc.on('recieve-file', function(file) {
	//Strip out the full file path to get the filename, and remove the extension
	var fileName = path.basename(file.filePath, ".md");
	document.getElementById("notename").value = fileName; 
	document.getElementById("pad").value = file.data;
});