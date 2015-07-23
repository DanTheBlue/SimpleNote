var ipc = require('ipc');

var saveFile = function(){
	//Get the data to call the filesave
	var file = {
		fileName : document.getElementById("notename").value,
		data : document.getElementById("pad").value
	}
	ipc.sendSync('save-file', file);
}

function loadFile() {

}