#! /usr/bin/env node
// var colors = require('colors');
var uitools = require('./src/ui/tools.js');

/* main entry point */
(function () {
    // the module command-line-args demand the process.argv Array be uptampered.
    // So I am forced into using all the functionality it supplies.
    uitools.print("testprint", "cyan");
    if(uitools.help) uitools.print(uitools.usage, "blue");
    else {
	for(k in uitools.getArgs) {
	    uitools.print(uitools.getArgs[k], "green");
	}
    }
})();
