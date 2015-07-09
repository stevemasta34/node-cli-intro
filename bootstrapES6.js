#! /usr/bin/env node

import { usage, cli, print } from "./src/ui/tools";
import { bumpVersion } from "./src/io";

function main () {
    // the module command-line-args demand the process.argv Array be uptampered.
    // So I am forced into using all the functionality it supplies.
    var options = cli.parse();
    print("testprint", "cyan");
    if(options.help) { 
	print(usage, "blue");
    } else {
	for(var k in options) {
	    print(options[k], "green");
	}
	bumpVersion("./package.json");
    }
}

main();
