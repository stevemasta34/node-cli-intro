// src/ui/tools.js
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.print = print;
var cliArgs = require('command-line-args');
var colors = require('colors');

/* command-line options */
var cli = cliArgs([{ name: 'verbose', type: Boolean, alias: 'v', description: 'Output operations to console' }, { name: 'help', type: Boolean, alias: 'h', description: 'Print usage instructions' },
//    { name: "files", type: Array, defaultOption: true, description: "The input files" },
{ name: 'bump', type: Boolean, alias: 'b', description: 'Perform a \'patch\' version bump' }, { name: 'bump-major', type: Boolean, alias: 'bma', description: 'Perform a \'major\' version bump' }, { name: 'bump-minor', type: Boolean, alias: 'bmi', description: 'Perform a \'minor\' version bump' }, { name: 'commit', type: Boolean, alias: 'c', description: 'Commit the local git repository.' }, { name: 'message', type: String, alias: 'm', description: 'Message to supplied to a commit' }]);

exports.cli = cli;
/* generate a usage guide */
var usage = cli.getUsage({
    header: '.',
    footer: 'For more, http://github.com/stevemasta34/es-new-to-current'
});

exports.usage = usage;
/* parse the supplied args */
// var options = cli.parse();

function print(obj, strColor) {
    try {
        if (strColor) {
            console.log(obj.toString()[strColor]);
        } else {
            console.log(obj.toString());
        }
    } catch (e) {
        console.error('Object was most likely null: ', e);
    }
}

;