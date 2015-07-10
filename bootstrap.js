#! /usr/bin/env node
"use strict";

var _srcUiTools = require("./src/ui/tools");

var _srcIo = require("./src/io");

function main() {
			// the module command-line-args demand the process.argv Array be uptampered.
			// So I am forced into using all the functionality it supplies.
			var options = _srcUiTools.cli.parse();
			(0, _srcUiTools.print)("testprint", "cyan");
			if (options.help) {
						(0, _srcUiTools.print)(_srcUiTools.usage, "blue");
			} else {
						for (var k in options) {
									(0, _srcUiTools.print)(options[k], "green");
						}
						// bumpVersion("./package.json");
						// this will be migrated to index.js
						if (options.commit) {
									(0, _srcIo.commit)(options.message);
						}
			}
}

main();