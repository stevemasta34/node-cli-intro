// src/ui/tools.js
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.print = print;
var cliArgs = require('command-line-args');
var colors = require('colors');

/* command-line options */
var cli = cliArgs([{ name: 'verbose', type: Boolean, alias: 'v', description: 'Output operations to console' }, { name: 'help', type: Boolean, alias: 'h', description: 'Print usage instructions' }, { name: 'files', type: Array, defaultOption: true, description: 'The input files' }]);

exports.cli = cli;
/* generate a usage guide */
var usage = cli.getUsage({
    header: 'A synopsis application.',
    footer: 'For more information, visit http://example.com'
});

exports.usage = usage;
/* parse the supplied args */
// var options = cli.parse();

function print(obj, strColor) {
    console.log(obj.toString()[strColor]);
}