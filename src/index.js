// node-cli-intro/src/index.js
import { usage, cli, print } from "./ui/tools";
import { bumpVersion, commit } from "./io";

export default function doFlow(optionsObj = cli.parse()) {
  if(optionsObj.help) { 
    print(usage, "yellow");
  }
  else {
    console.log(optionsObj);
    let bumpCB = function(error, data) {
	    // testing inappropriate bump function call
	    print(`Bump callback received data: ${data}`, "cyan");
    };

    if (optionsObj.message) {
      
      if (optionsObj.commit){
	      commit(optionsObj.message, function(error, dat) {
	        print(`The data thing: ${dat}`, "cyan");
	      });
      }
      
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
    }
  }
};
