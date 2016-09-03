// src/ui/tools.js
var cliArgs = require('command-line-args');
var colors = require('colors');

/* command-line options */
export var cli = cliArgs([{
  name: "version",
  type: String,
  alias: "v",
  description: "Specific versioning appendage: ie. alpha, beta, charlie"
}, {
  name: "help",
  type: Boolean,
  alias: "h",
  description: "Print usage instructions"
}, {
  name: "bump",
  type: Boolean,
  alias: "p",
  description: "Perform a version bump of either: major, minor, or patch (defaulting to patch)"
}, {
  name: "commit",
  type: Boolean,
  alias: "c",
  description: "Commit the local git repository."
}, {
  name: "message",
  type: String,
  alias: "m",
  description: "Message to supplied to a commit"
}]);

/* generate a usage guide */
export var usage = cli.getUsage({
  header: ".",
  footer: "For more, http://github.com/stevemasta34/es-new-to-current"
});

export function print(obj) {
  try {
    console.log(JSON.stringify(obj));
  } catch (e) {
    console.error("Object was most likely null: ", e);
  }
}

export function printError(obj) {
  console.error(JSON.stringify(obj).red);
  return -1;
}
