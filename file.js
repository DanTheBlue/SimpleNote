var path = require('path');

function File(filePath, data, notebook) {
	var parsed = path.parse(filePath);

	this.name = parsed['name'];
	/*Fix for the path being null.
	* If this check isnt perform, the nme is appended with null
	*/
	if(this.name.substring(0, 4) == "null") {
		this.name = this.name.substring(4, this.name.length);
	}

	this.path = parsed['dir'];
	this.extension = parsed['ext'];
	this.data = data;
	this.notebook = notebook || 'miscellaneous';
	this.saved = true;
}

// class methods
File.prototype.setNotebook = function(notebook) {
	this.notebook = notebook;
};
// export the class
module.exports = File;