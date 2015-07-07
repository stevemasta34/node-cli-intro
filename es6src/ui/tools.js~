// src/ui/tools.js
var cliArgs = require('command-line-args');
var colors = require('colors');

module.exports = (function () {	

    /* command-line options */
    var cli = cliArgs([
        { name: "verbose", type: Boolean, alias: "v", description: "Output operations to console"},
        { name: "help", type: Boolean, alias: "h", description: "Print usage instructions" },
        { name: "files", type: Array, defaultOption: true, description: "The input files" }
    ]);


    /* generate a usage guide */
    var usage = cli.getUsage({
        header: "A synopsis application.",
        footer: "For more information, visit http://example.com"
    }); 

    /* parse the supplied args */
    var options = cli.parse();

    return {
	getArgs: options,
	print: function (obj, strColor) {
	    console.log(obj.toString()[strColor]);
	},
	usage: usage,
	help: options.help
    }
})();
