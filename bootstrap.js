#! /usr/bin/env node

// var colors = require('colors');
"use strict";

var _srcUiTools = require("./src/ui/tools");

/* main entry point */
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
   }
}

main();
