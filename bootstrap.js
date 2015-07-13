#! /usr/bin/env node
"use strict";

var _srcUiTools = require("./src/ui/tools");

var _srcIndex = require("./src/index");

// the module command-line-args demand the process.argv Array be uptampered.
// So I am forced into using all the functionality it supplies.
var options = _srcUiTools.cli.parse();

// this will be migrated to index.js
(0, _srcIndex.doFlow)(options);