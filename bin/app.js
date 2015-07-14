#! /usr/bin/env node

import cli from "../src/ui/tools";
import doFlow from "../src/index";

// the module command-line-args demand the process.argv Array be uptampered.
// So I am forced into using all the functionality it supplies.
var options = cli.parse();

// this will be migrated to index.js
doFlow(options);

