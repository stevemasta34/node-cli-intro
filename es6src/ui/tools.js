// src/ui/tools.js
var cliArgs = require('command-line-args');
var colors = require('colors');

/* command-line options */
export var cli = cliArgs([
    { name: "verbose", type: Boolean, alias: "v", description: "Output operations to console"},
    { name: "help", type: Boolean, alias: "h", description: "Print usage instructions" },
    { name: "files", type: Array, defaultOption: true, description: "The input files" }
]);

/* generate a usage guide */
export var usage = cli.getUsage({
    header: ".",
    footer: "For more, http://github.com/stevemasta34/es-new-to-current"
}); 

/* parse the supplied args */
// var options = cli.parse();

export function print (obj, strColor) {
    if (strColor) {
        console.log(obj.toString()[strColor]);
    } else {
	console.log(obj.toString());
    }
}
		