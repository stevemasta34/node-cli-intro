#! /usr/bin/env node
"use strict";

var _srcUiTools = require("./src/ui/tools");

var _srcIo = require("./src/io");

var _srcIndex = require("./src/index");

function main() {
	// the module command-line-args demand the process.argv Array be uptampered.
	// So I am forced into using all the functionality it supplies.
	var options = _srcUiTools.cli.parse();
	// print("testprint", "cyan");
	if (options.help) {
		(0, _srcUiTools.print)(_srcUiTools.usage, "blue");
	} else {
		/*
  for(var k in options) {
  print(options[k], "green");
  } */
		// this will be migrated to index.js
		// bumpVersion("./package.json";)
		if (options.bump || options["bump-minor"] || options["bump-major"]) {
			// This could be done with string parsing, but that can be error pron
			// and this is a definite thing that will reduce operation count
			if (options["bump-major"]) {
				// pass the major key to the bump command
				(0, _srcIo.bumpVersion)("./package.json", "major");
			} else if (options["bump-minor"]) {
				// pass the minor key to the bump command
				(0, _srcIo.bumpVersion)("./package.json", "minor");
			} else {
				// pass the default key to bump command
				(0, _srcIo.bumpVersion)("./package.json", "default");
			}
		}
		if (options.commit) {
			(0, _srcIo.commit)(options.message);
		}
	}
}

main();