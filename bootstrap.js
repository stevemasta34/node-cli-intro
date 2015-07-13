#! /usr/bin/env node
"use strict";

var _srcUiTools = require("./src/ui/tools");

var _srcIo = require("./src/io");

var _srcIndex = require("./src/index");

// the module command-line-args demand the process.argv Array be uptampered.
// So I am forced into using all the functionality it supplies.
var options = _srcUiTools.cli.parse();

// this will be migrated to index.js
if (options.help) {
   (0, _srcUiTools.print)(_srcUiTools.usage, "blue");
} else {
   console.log(options);
   for (var k in options) {
      if (options.hasOwnProperty(k)) (0, _srcUiTools.print)(options[k], "green");
   }
   var bumpCB = function bumpCB(error, data) {
      // testing inappropriate bump function call
      console.log("Bump callback was hit");
   };

   // This could be done with string parsing, but that can be error pron
   // and this is a definite thing that will reduce operation count
   if (options["bump-major"] !== undefined) {
      // pass the major key to the bump command
      (0, _srcIo.bumpVersion)("./package.json", "major", bumpCB);
   }
   if (options["bump-minor"] !== undefined) {
      // pass the minor key to the bump command
      (0, _srcIo.bumpVersion)("./package.json", "minor", bumpCB);
   }
   if (options["bump"] !== undefined) {
      // pass the patch key to the bump command
      (0, _srcIo.bumpVersion)("./package.json", "patch", bumpCB);
   }
   if (options.commit) {
      (0, _srcIo.commit)(options.message, function (error, dat) {
         (0, _srcUiTools.print)("The data thing: {dat}", "blue");
      });
   }
}