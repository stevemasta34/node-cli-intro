#! /usr/bin/env node

import { usage, cli, print } from "./src/ui/tools";
import { bumpVersion, commit } from "./src/io";
import { run } from "./src/index";

// the module command-line-args demand the process.argv Array be uptampered.
// So I am forced into using all the functionality it supplies.
var options = cli.parse();

// this will be migrated to index.js
if(options.help) { 
    print(usage, "blue");
} else {
    console.log(options);
    for(var k in options) {
	if (options.hasOwnProperty(k))
	    print(options[k], "green");
    }
    let bumpCB = function(error, data) {
	// testing inappropriate bump function call
	console.log("Bump callback was hit");
    };

    
    // This could be done with string parsing, but that can be error pron
    // and this is a definite thing that will reduce operation count
    if (options["bump-major"] !== undefined) {
	// pass the major key to the bump command
	bumpVersion("./package.json", "major", bumpCB);
    }
    if (options["bump-minor"] !== undefined) {
	// pass the minor key to the bump command
	bumpVersion("./package.json", "minor", bumpCB);
    }
    if (options["bump"] !== undefined) {
	// pass the patch key to the bump command
	bumpVersion("./package.json", "patch", bumpCB);
    }
    if (options.commit){
	commit(options.message, function(error, dat) {
	    print(`The data thing: {dat}`, "blue");
	});
    }
    
}
