// src/ui/tools.js
var cliArgs = require('command-line-args');
var colors = require('colors/safe');

/* command-line options */
export var cli = cliArgs([
  { name: "verbose", type: Boolean, alias: "v", description: "Output operations to console"},
  { name: "help", type: Boolean, alias: "h", description: "Print usage instructions" },
  //    { name: "files", type: Array, defaultOption: true, description: "The input files" },
  { name: "bump-patch", type: Boolean, alias: "p", description: "Perform a 'patch' version bump" },
  { name: "bump-major", type: Boolean, alias: "M", description: "Perform a 'major' version bump" },
  { name: "bump-minor", type: Boolean, alias: "i", description: "Perform a 'minor' version bump" },
  { name: "commit", type: Boolean, alias: "c", description: "Commit the local git repository." },
  { name: "message", type: String, alias: "m", description: "Message to supplied to a commit" }
]);

/* generate a usage guide */
export var usage = cli.getUsage({
  header: ".",
  footer: "For more, http://github.com/stevemasta34/es-new-to-current"
}); 

export function print (obj, strColor) {
  try {
	  if (strColor) {
      console.log(([strColor])(obj));
	  } else {
      console.log(obj);
	  }
  } catch (e) {
	  console.error("Object was most likely null: ",e);
  }
};
		
