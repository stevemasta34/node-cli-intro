#! /usr/bin/env node

import { usage, cli, print } from "./src/ui/tools";
import { bumpVersion, commit } from "./src/io";
import { run } from "./src/index";

function main () {
    // the module command-line-args demand the process.argv Array be uptampered.
    // So I am forced into using all the functionality it supplies.
    var options = cli.parse();
    // print("testprint", "cyan");
    if(options.help) { 
	print(usage, "blue");
    } else { /*
	for(var k in options) {
	    print(options[k], "green");

	} */
	// this will be migrated to index.js
	print(options, "cyan");
	// This could be done with string parsing, but that can be error pron
	// and this is a definite thing that will reduce operation count
	if (options["bump-major"]) {
	    // pass the major key to the bump command
	    bumpVersion("./package.json", "major");
	} else if (options["bump-minor"]) {
	    // pass the minor key to the bump command
	    bumpVersion("./package.json", "minor");
	} else {
	    // pass the patch key to the bump command
	    bumpVersion("./package.json", "patch");
	}
	if (options.commit){
	    commit(options.message, function(error, dat) {
		print(`The data thing: {dat}`, "blue");
	    });
	}
	
    }
}

main();
