// node-cli-intro/src/index.js
import { usage, print } from "../lib/ui/tools";
import { bumpVersion, commit } from "../lib/io";

function myMethod () {
  console.log("This is how we do it.");
  console.log("And we keep on, keeping on");
};


export function doFlow(optionsObj) {
  if(optionsObj.help) { 
    print(usage, "blue");
  }
  else {
    console.log(optionsObj);
    for(var k in optionsObj) {
	    if (optionsObj.hasOwnProperty(k))
	      print(optionsObj[k], "green");
    }
    let bumpCB = function(error, data) {
	    // testing inappropriate bump function call
	    console.log("Bump callback was hit");
    };

    
    // This could be done with string parsing, but that can be error pron
    // and this is a definite thing that will reduce operation count
    if (optionsObj["bump-major"] !== undefined) {
	    // pass the major key to the bump command
	    bumpVersion("./package.json", "major", bumpCB);
    }
    if (optionsObj["bump-minor"] !== undefined) {
	    // pass the minor key to the bump command
	    bumpVersion("./package.json", "minor", bumpCB);
    }
    if (optionsObj["bump-patch"] !== undefined) {
	    // pass the patch key to the bump command
	    bumpVersion("./package.json", "patch", bumpCB);
    }
    if (optionsObj.commit){
	    commit(optionsObj.message, function(error, dat) {
	      print(`The data thing: ${dat}`, "blue");
	    });

    }
  }
};
