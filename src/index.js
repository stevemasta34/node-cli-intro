// node-cli-intro/src/index.js
import { usage, cli, print, printError } from "./utils/ui";
import { bumpPackageVersion, commit, tag, pushTags } from "./io";

export default function doFlow(optionsObj = cli.parse()) {
  let packageJsonPath = "./package.json";
  if(optionsObj.help) { 
    print(usage, "yellow");
  }
  else {
    if (optionsObj.message) {
      
      if (optionsObj.commit){
	      commit(optionsObj.message)
          .then( (res) => {
            console.log(`
                        git commited successfully with status code: ${res["childProcess"]["exitCode"]}`);
          })
          .then( () => {
            if (optionsObj["bump"]) {
              // print(`Decide on "bump ${optionsObj.bump}"`, "cyan");
              return bumpPackageVersion(packageJsonPath, optionsObj.bump);
            } else {
              throw "No bump version";
            }
          })
          .then( (verCode) => {
            if (optionsObj.version) {
              return tag(`${verCode}-${optionsObj.version}`, optionsObj.message);
            }
            else {
              print(`No version appendage for tagging ${verCode}`, "cyan");
              return tag(verCode, optionsObj.message);
            }
          })
          .then( () => commit(optionsObj.message))
          .then( () => pushTags() )
          .catch( (err) => {
            printError(err);
          });
      }     
    }
    else {
      printError("Please supply a message with -m");
    }
  }
};
